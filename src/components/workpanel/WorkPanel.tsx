import { Connection } from "../leftpanel/Connection";
import "./WorkPanel.css";

interface Props {
    conn: Connection | null
}

// sql scripts and queries
const WorkPanel = (props: Props) => {
    // no connection in LeftPanel selected
    if (props.conn === null) {
        return (
            <div>
                <h2>Worksheet</h2>
                <p>Please create or select a connection to open SQL worksheets!</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Worksheet ({props.conn.name})</h2>
            <div className="Sheet">
                <textarea className="TextInput"></textarea>
                <button className="ExecButton" title="click to run SQL code">Execute</button>
            </div>
            <div className="Output">

            </div>
        </div>
    )
}

export default WorkPanel;