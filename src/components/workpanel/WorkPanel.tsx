import { MouseEvent, useState } from "react";
import { Connection } from "../leftpanel/Connection";
import OutputTable from "./OutputTable";
import "./WorkPanel.css";

interface Props {
    conn: Connection | null
}

// sql scripts and queries
const WorkPanel = (props: Props) => {
    // store sql entered by user
    const [code, set_code] = useState<string>("");

    // no connection in LeftPanel selected
    if (props.conn === null) {
        return (
            <div>
                <h2>Worksheet</h2>
                <p>Please create or select a connection to open SQL worksheets!</p>
            </div>
        )
    }

    // execute sql
    const handle_execute = (e: MouseEvent) => {
        console.log(code);

        // connect to database and exeute code
        // display response
    }

    return (
        <div>
            <h2>Worksheet ({props.conn.name})</h2>
            <div className="Sheet">
                <textarea className="TextInput" placeholder="Enter SQL" onChange={e => set_code(e.target.value)}></textarea>
                <button className="ExecButton" title="click to run SQL code" onClick={handle_execute}>Execute</button>
            </div>
            <div className="Output">
                <h2>Results</h2>
                <OutputTable data={[["name", "age", "salary"], ["peter", "20", "2000"], ["john", "30", "5000"], ["jackson", "50", "10000"]]}/>
            </div>
        </div>
    )
}

export default WorkPanel;