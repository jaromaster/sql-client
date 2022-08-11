import "./OutputTable.css";

interface Props {
    data: any[][]
}

// display query results (data from props) as table
const OutputTable = (props: Props) => {
    const limit: number = 1000;

    const column_names = props.data.slice(0, 1);
    const data = props.data.slice(1, limit >= props.data.length ? props.data.length : limit); // limit number of max rows

    return (
        <div className="OutputTableDiv">
            <table className="OutputTable">
                <thead>
                    {column_names.map(row => {
                        return <tr>{row.map(val => <th>{val}</th>)}</tr>
                    })}
                </thead>
                <tbody>
                    {
                        data.map(row => {
                            return <tr>{row.map(val => <td>{val}</td>)}</tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OutputTable;