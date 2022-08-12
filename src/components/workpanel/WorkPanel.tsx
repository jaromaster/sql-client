import axios, { AxiosError } from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { Connection, DatabaseTypes } from "../leftpanel/Connection";
import OutputTable from "./OutputTable";
import "./WorkPanel.css";

// convert json to table (2d array)
const json_to_tab_data = (json: any): string[][] => {
    let tab_data: string[][] = [];

    for (let i = 0; i < json.length; i++) {
        const row = json[i];
        if (i === 0) {
            let tab_row: string[] = [];
            for (const key in row) {
                tab_row.push(key);
            }
            tab_data.push(tab_row);
        }

        let tab_row: string[] = [];
        Object.values(row).forEach(val => {
            tab_row.push(val as string);
        })
        
        tab_data.push(tab_row);
    }

    return tab_data;
}

interface Props {
    conn: Connection | null
}

// sql scripts and queries
const WorkPanel = (props: Props) => {
    const connector_host: string = "http://localhost:8000";


    // store sql entered by user
    const [code, set_code] = useState<string>("");

    // output data (query result)
    const [output_data, set_output_data] = useState<string[][]>([]);

    // error message
    const [error_msg, set_error_msg] = useState<string>("");

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
        // connect to database and execute code

        if (props.conn === null) {
            return;
        }

        if (props.conn.type === DatabaseTypes.MYSQL) {
            axios.post(connector_host+"/mysql", {
                conn: props.conn,
                query: code.trim()
            })
            .then(res => {
                const response_data = res.data;
                let tab_data: string[][] = [];

                // query results (data) as rows (select)
                if("rows" in response_data) {
                    tab_data = json_to_tab_data(response_data["rows"]);
                }
                // number of affected rows (update, delete, ...)
                else {
                    tab_data = [["affectedRows"], [response_data["affectedRows"]]];
                }

                // display data
                set_error_msg("");
                set_output_data(tab_data);
            })
            .catch(err => {
                const axios_err: AxiosError = err;
                set_output_data([]);

                // display error message
                if (axios_err.response?.status === 400) {
                    set_error_msg(axios_err.response.data as string);
                }
                else if (axios_err.response?.status === 401) {
                    set_error_msg("Invalid user or password");
                }
                else {
                    set_error_msg(axios_err.message);
                }
            });
        }
    }


    const output_element = (
        <div className="Output">
            <h2>Results</h2>
            <OutputTable data={output_data}/>
        </div>
    )

    const err_output_element = (
        <div className="Output">
            <h2>Errors</h2>
            <p>{error_msg}</p>
        </div>
    )

    return (
        <div>
            <h2>Worksheet ({props.conn.name})</h2>
            <div className="Sheet">
                <textarea className="TextInput" placeholder="Enter SQL" onChange={e => set_code(e.target.value)}></textarea>
                <button className="ExecButton" title="click to run SQL code" onClick={handle_execute}>Execute</button>
            </div>
            {
                output_data.length > 0 &&
                output_element
            }
            {
                error_msg.length > 0 &&
                err_output_element
            }
        </div>
    )
}

export default WorkPanel;