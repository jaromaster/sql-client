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

    if (props.selected) {
        return (
            <div className="ConnectionItem" style={{backgroundColor: "grey"}}>
                <div style={{width: "70%"}} title="click to select">
                    <p>{connection.name}</p>
                </div>
    
                <div style={{display: "flex", alignItems: "center"}}>
                    <button className="EditButton" title="click to edit" onClick={e => props.clicked_edit(connection)}>Edit</button>
                    <button className="DelButton" title="click to delete" onClick={e => props.clicked_del(props.connection.id)}>-</button>
                </div>
            </div>
        )
    }

    return (
        <div className="ConnectionItem">
            <div style={{width: "70%"}} title="click to select" onClick={e => props.clicked(connection)}>
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