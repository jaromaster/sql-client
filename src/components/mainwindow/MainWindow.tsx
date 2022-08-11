import { useState } from "react";
import { Connection } from "../leftpanel/Connection";
import LeftPanel from "../leftpanel/LeftPanel";
import WorkPanel from "../workpanel/WorkPanel";
import "./MainWindow.css";


// contains all other components
const MainWindow = () => {
    // store selected connection
    const [connection, set_connection] = useState<Connection | null>(null);

    // called when connection selected in LeftPanel
    const handle_connection_selected = (conn: Connection) => {
        set_connection(conn);
    }

    return (
        <div className="MainPanel">
            <div className="LeftPanel">
                <LeftPanel selected={handle_connection_selected}/>
            </div>
            <div className="WorkPanel">
                <WorkPanel conn={connection}/>
            </div>
        </div>
    )
}

export default MainWindow;