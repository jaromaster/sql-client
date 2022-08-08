import { Connection } from "./Connection";
import "./ConnectionEdit.css";


interface Props {
    conn_to_edit: Connection | null
}

// allow user to add or edit connection
const ConnectionEdit = (props: Props) => {
    let name: string = "";
    let host: string = "";
    let user: string = "";
    let password: string = "";
    let database: string = "";

    // edit connection if not null
    if (props.conn_to_edit !== null) {
        name = props.conn_to_edit.name;
        host = props.conn_to_edit.host;
        user = props.conn_to_edit.user;
        password = props.conn_to_edit.password;
        database = props.conn_to_edit.database;
    }

    // edit connection
    let dynamic_headline = `Edit ${name}`;
    if (props.conn_to_edit === null) {
        dynamic_headline = "Create connection";
    }

    
    return (
        <div>
            <h2>{dynamic_headline}</h2>
            <form className="ConnEditGrid">
                <label>Name</label>
                <input type="text" value={name} required></input>

                <label>Host</label>
                <input type="text" value={host} required></input>

                <label>User</label>
                <input type="text" value={user} required></input>

                <label>Password</label>
                <input type="password"  value={password} required></input>

                <label>Database</label>
                <input type="text" value={database} required></input>

                <div></div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default ConnectionEdit;