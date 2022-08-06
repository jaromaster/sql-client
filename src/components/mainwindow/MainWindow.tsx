import LeftPanel from "../leftpanel/LeftPanel";
import WorkPanel from "../workpanel/WorkPanel";
import "./MainWindow.css";


// contains all other components
const MainWindow = () => {
    return (
        <div className="MainPanel">
            <div className="LeftPanel">
                <LeftPanel />
            </div>
            <div className="WorkPanel">
                <WorkPanel />
            </div>
        </div>
    )
}

export default MainWindow;