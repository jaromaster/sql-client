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

    // called when connection is clicked or "add connection" button clicked
    const handle_connection_clicked = (conn: Connection | null) => {
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

    // toggle connection edit/add form
    const [selected_connection, set_selected_connection] = useState<null | Connection>(null); // connection to edit / new connection
    const [show_connection_form, set_show_connection_form] = useState<boolean>(false); // show form

    return (
        <div>
            <h2>Connections</h2>
            {/* show connections */}
            <div className="ConnectionsDiv">
                {
                    connection_dummy.map((val, idx) => <ConnectionElement key={idx} connection={val} clicked={(conn: Connection)=>handle_connection_clicked(conn)}/>)
                }
            </div>

            <button onClick={e => handle_connection_clicked(null)}>Add Connection</button>
            {
                show_connection_form &&
                <ConnectionEdit conn_to_edit={selected_connection}/>
            }
        </div>
    )
}

export default LeftPanel;