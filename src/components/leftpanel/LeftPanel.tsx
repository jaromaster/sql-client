import { useState } from "react";

import "./LeftPanel.css";
import {Connection} from "./Connection";
import ConnectionElement from "./Connection";
import ConnectionEdit from "./ConnectionEdit";


// display connections on left side of window
const LeftPanel = () => {

    // existing connections (persist to file)
    const connection_dummy: Connection[] = [
        {id: "1", name: "Connection1", database: "UserDB", host: "localhost", user: "default-user", password: "secret"},
        {id: "2", name: "Connection2", database: "PaymentsDB", host: "localhost", user: "default-user", password: "password"},
        {id: "3", name: "Connection3", database: "PasswordsDB", host: "localhost", user: "default-user", password: "root"},
        {id: "4", name: "Connection4", database: "ProductsDB", host: "localhost", user: "default-user", password: "somepasswd"}
    ];

    // store user connections
    const [connections, set_connections] = useState<Connection[]>(connection_dummy);

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

        let new_connections = [...connections];

        // handle invalid id
        if (conn.id === "-1"){

            let max_id: number = Number.MIN_VALUE;
            for (let i = 0; i < new_connections.length; i++) {
                max_id = Math.max(max_id, parseInt(new_connections[i].id));
            }

            const new_id: string = (max_id+1).toString();
            const new_conn: Connection = Object.assign({}, conn);
            new_conn.id = new_id;

            new_connections.push(new_conn);
        }
        else {
            // update connection with id
            for (let i = 0; i < new_connections.length; i++) {
                const c = new_connections[i];
                if (c.id === conn.id) {
                    new_connections[i] = conn;
                }
            }
        }
        
        set_connections(new_connections);
    }

    // handle if delete button of connection is clicked
    const handle_connection_del_clicked = (conn_id: string) => {
        let new_connections = [...connections];

        for (let i = 0; i < new_connections.length; i++) {
            if (new_connections[i].id === conn_id){
                new_connections.splice(i, 1);
            }
        }
        set_connections(new_connections);
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
                    clicked_del={(conn_id: string)=>handle_connection_del_clicked(conn_id)}/>)
                }
            </div>

            <button onClick={e => handle_connection_edit_clicked(null)}>Add Connection</button>
            {
                show_connection_form &&
                <ConnectionEdit conn_to_edit={selected_connection} conn_submitted={handle_connection_submit}/>
            }
        </div>
    )
}

export default LeftPanel;