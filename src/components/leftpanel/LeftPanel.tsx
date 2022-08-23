import { useEffect, useState } from "react";
import "./LeftPanel.css";
import { Connection } from "./Connection";
import ConnectionElement from "./Connection";
import ConnectionEdit from "./ConnectionEdit";
import axios from "axios";


interface Props {
    selected: Function
}

// display connections on left side of window
const LeftPanel = (props: Props) => {

    // store user connections
    const [connections, set_connections] = useState<Connection[]>([]);

    // get existing connections from server
    useEffect(()=> {
        axios.get("/connections", {timeout: 2000})
        .then(res => {
            if (res.status === 200){
                set_connections(res.data);
            }
        })
        .catch(err => {
            console.log(err)
            alert("could not retrieve connections");
        });
    }, []);

    // called when connection edit button is clicked or "add connection" button clicked
    const handle_connection_edit_clicked = (conn: Connection | null) => {
        // no conn or selection is null
        if (conn === null && selected_connection === null){
            set_show_connection_form(!show_connection_form);
        }

        // already selected
        else if (conn !== null && selected_connection !== null && conn.id === selected_connection.id) {
            set_selected_connection(null);
            set_show_connection_form(false);
        }
        // newly selected
        else {
            set_show_connection_form(true);
            set_selected_connection(conn);
        }
    }

    // when connection edited or added and changes submitted
    const handle_connection_submit = (conn: Connection) => {

        // get all connections
        axios.get("/connections", {timeout: 2000})
        .then(res => {
            if (res.status === 200){
                set_connections(res.data);
            }
        })
        .catch(err => {
            console.log(err)
            alert("could not retrieve connections");
        });

        // send conn to WorkPanel to allow user to run sql queries using connection
        props.selected(conn);
    }

    // handle if delete button of connection is clicked
    const handle_connection_del_clicked = (conn_id: string) => {
        let new_connections = [...connections];

        for (let i = 0; i < new_connections.length; i++) {
            if (new_connections[i].id === conn_id){
                new_connections.splice(i, 1);
            }
        }

        // delete connection from server
        axios.delete(`/connections/${conn_id}`, {timeout: 2000})
        .then(res => {
            if (res.status !== 200){
                alert("could not delete connection");
            }
        })
        .catch(err => {
            console.log(err)
            alert("could not delete connection");
        })

        set_connections(new_connections);
    }

    
    // handle if connection is selected (connect to database, start sql editor etc.)
    const handle_connection_clicked = (conn: Connection) => {
        set_selected_connection(conn);
        set_show_connection_form(false);

        // send conn to WorkPanel to allow user to run sql queries using connection
        props.selected(conn);
    }

    // toggle connection edit/add form
    const [selected_connection, set_selected_connection] = useState<null | Connection>(null); // connection to edit / new connection
    const [show_connection_form, set_show_connection_form] = useState<boolean>(false); // show form

    return (
        <div>
            <h2>Connections</h2>
            {/* show connections */}
            <div className="ConnectionsDiv">
                {
                    connections.map((val, idx) => <ConnectionElement key={idx} connection={val} clicked_edit={(conn: Connection)=>handle_connection_edit_clicked(conn)}
                    clicked_del={(conn_id: string)=>handle_connection_del_clicked(conn_id)} selected={selected_connection !== null && (val.id === selected_connection.id) ? true : false}
                    clicked={(conn: Connection)=>handle_connection_clicked(conn)}/>)
                }
            </div>

            <button className="AddConnButton" onClick={e => handle_connection_edit_clicked(null)} title="create new connection">Add Connection</button><br></br>
            {
                show_connection_form &&
                <ConnectionEdit conn_to_edit={selected_connection} conn_submitted={handle_connection_submit}/>
            }
        </div>
    )
}

export default LeftPanel;