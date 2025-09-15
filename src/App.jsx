import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Button from "./components/Button";
const App = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="container">
            {!open ? (
                <>
                    <header className="header">Title</header>
                    <div className="home-page">
                        卡片世界
                        <Button onClick={() => setOpen(true)}>
                            Click Me , Enter The World
                        </Button>
                    </div>
                </>
            ) : (
                <CardContainer />
            )}
        </div>
    );
};

export default App;

const CardContainer = () => {
    return (
        <div className="card-container">
            <Card initX={-100} initY={-100} />
            <Card initX={100} initY={-100} />
            <Card initX={-100} initY={100} />
            <Card initX={100} initY={100} />
        </div>
    );
};
