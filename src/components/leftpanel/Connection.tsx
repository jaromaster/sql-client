import "./Connection.css";

// define fields of Connection
export interface Connection {
    id: string
    name: string
    host: string
    user: string
    password: string
    database: string
}

// define props for component
interface PropsInterface {
    connection: Connection
    clicked_edit: Function
    clicked_del: Function
}

// selectable connection to some database
const ConnectionElement = (props: PropsInterface) => {
    const connection = props.connection;

    return (
        <div className="ConnectionItem">
            <div style={{width: "80%"}} title="click to select">
                <p>{connection.name}</p>
            </div>

            <div style={{display: "flex", alignItems: "center"}}>
                <button className="EditButton" title="click to edit" onClick={e => props.clicked_edit(connection)}>Edit</button>
                <button className="DelButton" title="click to delete" onClick={e => props.clicked_del(props.connection.id)}>-</button>
            </div>
        </div>
    )
}

export default ConnectionElement;