import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Button from "./components/StartButton";
import demo1 from "./assets/demo1.svg";
import CardImage from "./components/CardImage";
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
    // return <CardImage />;
};

export default App;

const CardContainer = () => {
    const [cardList, setCardList] = useState([
        {
            initX: -100,
            initY: -100,
            buttonText: "毅力",
            checked: false,
            display: true,
            svgImage: demo1,
        },
        {
            initX: 100,
            initY: -100,
            buttonText: "樂觀",
            checked: false,
            display: true,
            svgImage: null,
        },
        {
            initX: -100,
            initY: 100,
            buttonText: "積極",
            checked: false,
            display: true,
            svgImage: null,
        },
        {
            initX: 100,
            initY: 100,
            buttonText: "執著",
            checked: false,
            display: true,
            svgImage: null,
        },
    ]);

    const handleClickCard = (text) => {
        setCardList((cards) => {
            return cards.map((card) => {
                if (card.buttonText === text) {
                    return { ...card, checked: true };
                }
                return { ...card, display: false };
            });
        });
    };
    return (
        <div className="card-container">
            {cardList.map(
                ({ initX, initY, buttonText, checked, display, svgImage }) => (
                    <Card
                        key={buttonText}
                        initX={initX}
                        initY={initY}
                        buttonText={buttonText}
                        checked={checked}
                        display={display}
                        svgImage={svgImage}
                        onClick={handleClickCard}
                    />
                )
            )}
        </div>
    );
};
