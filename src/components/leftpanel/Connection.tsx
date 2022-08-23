import "./Connection.css";

// supported database types
export enum DatabaseTypes {
    MYSQL = "MySQL",
    POSTGRES = "PostgreSQL"
}


// define fields of Connection
export interface Connection {
    id: string
    name: string
    host: string
    user: string
    password: string
    type: DatabaseTypes
    database: string
}

// define props for component
interface PropsInterface {
    connection: Connection
    selected: boolean
    clicked_edit: Function
    clicked_del: Function
    clicked: Function
}

// selectable connection to some database
const ConnectionElement = (props: PropsInterface) => {
    const connection = props.connection;

    let color = "";
    if (props.selected) {
        color = "aquamarine";
    }

    return (
        <div className="ConnectionItem">
            <div className="ConnectionItemName" title="click to select" onClick={e => props.clicked(connection)}>
                <p style={{color: color}}>{connection.name}</p>
            </div>

            <div className="ConnectionItemEdit">
                <button className="EditButton" title="click to edit" onClick={e => props.clicked_edit(connection)}>Edit</button>
                <button className="DelButton" title="click to delete" onClick={e => props.clicked_del(props.connection.id)}>-</button>
            </div>
        </div>
    )
}

export default ConnectionElement;