import { useState } from "react";
import "./App.css";

// 加上 ?raw（Vite Raw Import）會把檔案內容以純文字字串匯入。這樣我們才能用 DOMParser 解析 SVG
import Unicorn from "./assets/Unicorn.svg?raw";
import Snowflake from "./assets/Snowflake.svg?raw";
import Gift from "./assets/Gift.svg?raw";
import Reindeer from "./assets/Reindeer.svg?raw";

import Card from "./components/Card";
import StartButton from "./components/StartButton";
import Header from "./components/Header";
import Title from "./components/Title";
import Options from "./components/Options";

const App = () => {
    const [step, setStep] = useState(1);
    const [show, setShow] = useState(true);
    const addStep = () => {
        setStep((prev) => prev + 1);
        setShow(true);
    };
    return (
        <div className="container">
            {step === 1 && (
                <>
                    <Header show={show} />
                    <div className="content">
                        <Title show={show}>
                            時光總偏心為您獨特滯留
                            <br />
                            為您迷人風采造就出脫穎
                        </Title>

                        <div className="home-page-button">
                            <StartButton onClick={addStep} setShow={setShow}>
                                Click Me , Enter The World
                            </StartButton>
                        </div>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <Header show={show} />
                    <div className="content">
                        <Title show={show}>
                            歡迎進駐&nbsp;匠藝幾何世界
                            <br />
                            靜下心，抽取專屬卡牌
                        </Title>
                        <div className="content-card">
                            <CardContainer setStep={addStep} />
                        </div>
                    </div>
                </>
            )}

            {step === 3 && <OptionList />}
        </div>
    );
};

export default App;

const CardContainer = ({ setStep }) => {
    const [cardList, setCardList] = useState([
        {
            initX: -100,
            initY: -100,
            buttonText: "獨角獸",
            checked: false,
            display: true,
            svgImage: Unicorn,
        },
        {
            initX: 100,
            initY: -100,
            buttonText: "雪花",
            checked: false,
            display: true,
            svgImage: Snowflake,
        },
        {
            initX: -100,
            initY: 100,
            buttonText: "禮物",
            checked: false,
            display: true,
            svgImage: Gift,
        },
        {
            initX: 100,
            initY: 100,
            buttonText: "馴鹿",
            checked: false,
            display: true,
            svgImage: Reindeer,
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
                        setStep={setStep}
                    />
                )
            )}
        </div>
    );
};

const OptionList = () => {
    return (
        <div className="option-container">
            <div className="option-list">
                <div className="option-header">
                    <div className="option-left-circle">
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="option-body">{/* <Options /> */}</div>
                    <div className="option-right-circle">
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
