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
import Loading from "./components/Loading";

const App = () => {
    const [step, setStep] = useState(1);

    const [showTitle, setShowTitle] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const addStep = () => {
        setStep((prev) => prev + 1);
        setShowTitle(true);
        setShowHeader(true);
    };
    return (
        <div className="container">
            {step === 1 && (
                <>
                    <Header show={showHeader} />
                    <div className="home-page-content">
                        <Title show={showTitle}>
                            時光總偏心為您獨特滯留
                            <br />
                            為您迷人風采造就出脫穎
                        </Title>

                        <div className="home-page-button">
                            <StartButton
                                onClick={addStep}
                                setShow={(bool) => {
                                    setShowTitle(bool);
                                    setShowHeader(bool);
                                }}
                            >
                                Click Me , Enter The World
                            </StartButton>
                        </div>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <Header show={showHeader} />
                    <div className="card-content">
                        <Title show={showTitle}>
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

            {step === 3 && (
                <>
                    <Header show={showHeader} />
                    <div className="">
                        <Title show={showTitle}>
                            步行在異世界的走廊，
                            <br />
                            您想成為的樣貌是？
                        </Title>
                        <OptionList
                            setStep={addStep}
                            closeTitle={() => {
                                setShowTitle(false);
                            }}
                            closeHeader={() => {
                                setShowHeader(false);
                            }}
                        />
                    </div>
                </>
            )}

            {step === 4 && <Loading />}
        </div>
    );
};

export default App;

const CardContainer = ({ setStep }) => {
    const [cardList, setCardList] = useState([
        {
            endpointX: 20,
            endpointY: 5,
            buttonText: "獨角獸",
            checked: false,
            display: true,
            svgImage: Unicorn,
        },
        {
            endpointX: -20,
            endpointY: 5,
            buttonText: "雪花",
            checked: false,
            display: true,
            svgImage: Snowflake,
        },
        {
            endpointX: 20,
            endpointY: -5,
            buttonText: "禮物",
            checked: false,
            display: true,
            svgImage: Gift,
        },
        {
            endpointX: -20,
            endpointY: -5,
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
                ({
                    buttonText,
                    checked,
                    display,
                    svgImage,
                    endpointX,
                    endpointY,
                }) => (
                    <Card
                        key={buttonText}
                        buttonText={buttonText}
                        checked={checked}
                        display={display}
                        svgImage={svgImage}
                        endpointX={endpointX}
                        endpointY={endpointY}
                        onClick={handleClickCard}
                        setStep={setStep}
                    />
                )
            )}
        </div>
    );
};

const OptionList = ({ setStep, closeTitle, closeHeader }) => {
    return (
        <div className="option-container">
            <div className="option-content">
                <div className="option-header">
                    <Options
                        setStep={setStep}
                        closeTitle={closeTitle}
                        closeHeader={closeHeader}
                    />
                </div>
            </div>
        </div>
    );
};
