import { useState } from "react";


// const items = [{ id: 1, name: "打電話叫媽媽匯款給我", finished: false }, { id: 2, name: "整理電腦資料夾", finished: true }, { id: 3, name: "繳電費水費瓦斯費", finished: true }, { id: 4, name: "約vicky禮拜三泡溫泉", finished: true }, { id: 5, name: "約ada禮拜四吃晚餐", finished: false }];

const filter_stat = [{ name: "全部", stat: "all", active: true }, { name: "待完成", stat: "undo", active: false }, { name: "已完成", stat: "finish", active: false }]


function Todolist({ items }) {
    const [newitems, setNewItems] = useState(items);
    const [item, setItem] = useState("");
    const [filterStat, setFilterStat] = useState(filter_stat);
    let filteredItems = [];

    //change filter
    function changeFilter(updateStat) {
        let newStat = [{ stat: "all", active: false }, { stat: "undo", active: false }, { stat: "finish", active: false }]
        for (let i = 0; i < newStat.length; i++) {
            if (newStat[i].stat === updateStat)
                newStat[i].active = true;
        }
        setFilterStat(newStat);

    };

    // additem
    function additem() {
        let checkItem = newitems.filter((newitems) => newitems.name === item);
        console.log(checkItem);
        if (checkItem.length === 0) {
            let newArray = [...newitems, { name: item, finished: false }];
            setNewItems(newArray);
        } else
            alert("待辦事項已在清單中");

    }

    //worklist
    function onChangeFinished(itemName) {
        let newArray = [...newitems];
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].name === itemName) {
                newArray[i].finished = !newArray[i].finished;
            }
        }
        setNewItems(newArray);
    }

    function delItem(itemName) {
        setNewItems(newitems.filter((newitems) => newitems.name !== itemName));
    }

    const statusFilter = () => {
        let Tabs = filterStat.map((filterStat) =>
            <input
                className={filterStat.active ? "stausFilter-Active" : "stausFilter-All"}
                type="button"
                onClick={() => changeFilter(filterStat.stat)}
                value={filterStat.name} />
        );
        return Tabs;
    }

    const listItems = () => {
        let filter = "all";
        for (let i = 0; i < filterStat.length; i++) {
            if (filterStat[i].active === true) {
                filter = filterStat[i].stat;
            }
        }
        if (filter === "undo") {
            filteredItems = newitems.filter((newitems) => newitems.finished === false);
        } else if (filter === "finish") {
            filteredItems = newitems.filter((newitems) => newitems.finished === true);
        } else {
            filteredItems = newitems;
        }

        let list = filteredItems.map((filteredItems) =>
            <li key={filteredItems.name} className={filteredItems.finished === false ? "undo" : "finished"} > <input className="todoList_input" type="checkbox" checked={filteredItems.finished === false ? false : true} onChange={() => onChangeFinished(filteredItems.name)} />{filteredItems.name}<input className="delbtn" type="button" onClick={() => delItem(filteredItems.name)} value="刪除" /></li>

        )
        return list;
    };

    // total undo

    let undoCount = recount();
    function recount() {
        let undo_count;
        if (filterStat[0].active === true || filterStat[1].active === true) {
            undo_count = newitems.filter((newitems) => newitems.finished === false);
            return undo_count.length;
        } else {
            return 0;
        }

    };
    function clearAll() {
        let undo = [];
        for (let i = 0; i < newitems.length; i++) {
            if (newitems[i].finished === false) {
                undo.push(newitems[i]);
            };
        };
        setNewItems(undo);
        undoCount = recount();
    };

    return (
        <div className="wrap">
            <div className="todolist_header">
                <img className="todolist_logo "
                    src={'https://github.com/hexschool/webLayoutTraining1st/blob/master/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/logo.png?raw=true'}
                    alt="Todolist_Logo" />
            </div>


            <div className="todolist_content">
                {/* additem */}
                <div className="todolistItemAdder">
                    <input type="text" placeholder="新增待辦事項" onChange={(e) => { setItem(e.target.value) }} />
                    <input className="btn" type="button" onClick={additem} value="+" />
                </div>
                <div className="todolistUserList">
                    {/* filter */}
                    <div className="statusFilter">
                        {statusFilter()}
                    </div>

                    {/* worklist */}
                    <ul className="worklist">
                        {listItems().length > 0 ? listItems() : <li className="undo">目前尚無待辦事項</li>}
                    </ul>

                    {/* totalundo */}

                    <div className="total" >
                        <p className="itemsSum"> {undoCount} 個待完成項目</p>
                        < input type="button" className="clearItems" onClick={clearAll} value="清除已完成項目" />
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Todolist;