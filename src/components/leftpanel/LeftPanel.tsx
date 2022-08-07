import { useState } from "react";

import "./LeftPanel.css";
import {Connection} from "./Connection";
import ConnectionElement from "./Connection";
import ConnectionEdit from "./ConnectionEdit";


// display connections on left side of window
const LeftPanel = () => {

    // existing connections (persist to file)
    const connection_dummy: Connection[] = [
        {name: "Connection1", database: "UserDB", host: "localhost", user: "default-user", password: "secret"},
        {name: "Connection2", database: "PaymentsDB", host: "localhost", user: "default-user", password: "password"},
        {name: "Connection3", database: "PasswordsDB", host: "localhost", user: "default-user", password: "root"},
    ];

    
    const [selected_connection, set_selected_connection] = useState<null | Connection>(null);
    console.log(selected_connection)

    return (
        <div>
            <h2>Connections</h2>
            {/* show connections */}
            <div className="ConnectionsDiv">
                {
                    connection_dummy.map(val => <ConnectionElement connection={val} clicked={(conn: Connection)=>set_selected_connection(conn)}/>)
                }
            </div>

            <button>Add Connection</button>
            {
                selected_connection != null &&
                <ConnectionEdit conn_to_edit={selected_connection}/>
            }
        </div>
    )
}

export default LeftPanel;