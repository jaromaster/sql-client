import "./Connection.css";

// define fields of Connection
interface Connection {
    name: string
    host: string
    user: string
    password: string
    database: string
}

// define props for component
interface PropsInterface {
    connection: Connection
}

// selectable connection to some database
const Connection = (props: PropsInterface) => {
    const connection = props.connection;

    return (
        <div className="ConnectionItem" title="Click to edit">
            <p>{connection.name}</p>
        </div>
    )
}

export default Connection;