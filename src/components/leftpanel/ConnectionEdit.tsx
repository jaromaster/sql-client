import { FormEvent, useEffect, useState } from "react";
import { Connection, DatabaseTypes } from "./Connection";
import "./ConnectionEdit.css";


interface Props {
    conn_to_edit: Connection | null
    conn_submitted: Function
}

// allow user to add or edit connection
const ConnectionEdit = (props: Props) => {
    let name: string = "";
    let host: string = "";
    let user: string = "";
    let password: string = "";
    let type: DatabaseTypes = DatabaseTypes.MYSQL;
    let database: string = "";

    // edit connection if not null
    if (props.conn_to_edit !== null) {
        name = props.conn_to_edit.name;
        host = props.conn_to_edit.host;
        user = props.conn_to_edit.user;
        password = props.conn_to_edit.password;
        type = props.conn_to_edit.type;
        database = props.conn_to_edit.database;
    }

    // input values
    const [input_name, set_input_name] = useState<string>(name);
    const [input_host, set_input_host] = useState<string>(host);
    const [input_user, set_input_user] = useState<string>(user);
    const [input_password, set_input_password] = useState<string>(password);
    const [input_type, set_input_type] = useState<DatabaseTypes>(type);
    const [input_database, set_input_database] = useState<string>(database);

    // set state to values from props
    useEffect(()=> {
        set_input_name(name);
        set_input_host(host);
        set_input_user(user);
        set_input_password(password);
        set_input_type(type);
        set_input_database(database);
    }, [name, host, user, password, type, database]);

    // edit connection
    let dynamic_headline = `Edit ${name}`;
    if (props.conn_to_edit === null) {
        dynamic_headline = "Create connection";
    }

    // called when form is submitted
    const handle_submit = (e: FormEvent) => {
        e.preventDefault();
        
        let conn_id: string = "-1";
        if (props.conn_to_edit !== null) {
            conn_id = props.conn_to_edit.id;
        }

        // create connection
        const conn: Connection = {id: conn_id, 
            name: input_name, 
            host: input_host,
            user: input_user,
            password: input_password,
            type: input_type,
            database: input_database
        }
        
        props.conn_submitted(conn);
    }

    return (
        <div>
            <h2>{dynamic_headline}</h2>
            <form className="ConnEditGrid" onSubmit={e => handle_submit(e)}>
                <label>Name</label>
                <input type="text" value={input_name} onChange={e => set_input_name(e.target.value)} required></input>

                <label>Host</label>
                <input type="text" value={input_host} onChange={e => set_input_host(e.target.value)} required></input>

                <label>Type</label>
                <select onChange={e => {
                    Object.values(DatabaseTypes).forEach(val => {
                        if (val === e.target.value){
                            set_input_type(e.target.value);
                        }
                    })
                }} value={input_type} required>
                    {
                        Object.values(DatabaseTypes).map(val => <option>{val}</option>)
                    }
                </select>

                <label>User</label>
                <input type="text" value={input_user} onChange={e => set_input_user(e.target.value)} required></input>

                <label>Password</label>
                <input type="password" value={input_password} onChange={e => set_input_password(e.target.value)}></input>

                <label>Database</label>
                <input type="text" value={input_database} onChange={e => set_input_database(e.target.value)} required></input>

                <div></div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default ConnectionEdit;