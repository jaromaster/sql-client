import Connection from "./Connection";
import "./LeftPanel.css";


// display connections on left side of window
const LeftPanel = () => {

    // existing connections (persist to file)
    const connection_dummy: Connection[] = [
        {name: "Connection1", database: "UserDB", host: "localhost", user: "default-user", password: "secret"},
        {name: "Connection2", database: "PaymentsDB", host: "localhost", user: "default-user", password: "password"},
        {name: "Connection3", database: "PasswordsDB", host: "localhost", user: "default-user", password: "root"},
    ];


    return (
        <div>
            <h2>Connections</h2>
            {/* show connections */}
            <div className="ConnectionsDiv">
                {
                    connection_dummy.map(val => <Connection connection={val}/>)
                }
            </div>

            <button>Add Connection</button>
        </div>
    )
}

export default LeftPanel;