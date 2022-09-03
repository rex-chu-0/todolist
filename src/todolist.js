import { useState, useEffect } from "react";
import { UpdateAuth } from "./Auth";
import { todoAPI, delAPI, toggleAPI, addAPI } from "./callAPI";
import { useNavigate } from "react-router-dom";

// const items = [{ id: 1, content: "打電話叫媽媽匯款給我", complete_at: null }, { id: 2, content: "整理電腦資料夾", complete_at: true }, { id: 3, content: "繳電費水費瓦斯費", complete_at: null }, { id: 4, content: "約vicky禮拜三泡溫泉", complete_at: true }, { id: 5, content: "約ada禮拜四吃晚餐", complete_at: false }];

const filter_stat = [{ name: "全部", stat: "all", active: true }, { name: "待完成", stat: "undo", active: false }, { name: "已完成", stat: "finish", active: false }]

const items = { "todos": [{ id: "f3746698720506c921d02fad7cb30e1f", content: "aaa", completed_at: null }] };


function Todolist() {
    const [newitems, setNewItems] = useState([]);
    const { token } = UpdateAuth();
    const [item, setItem] = useState("");
    const [filterStat, setFilterStat] = useState(filter_stat);
    const Navigate = useNavigate();
    let filteredItems = [];

    const getTodo = () => {
        todoAPI(token)
            .then((res) => res.json())
            .then((res) => {
                setNewItems(res.todos);
            });
    }


    const checkLogin = (token) => {
        if (token === null) {
            alert("授權失效，請重新登入！");
            Navigate("/login");
        }
    }


    useEffect(() => {
        checkLogin(token);
        getTodo();
    }, [])




    //change filter
    function changeFilter(updateStat) {
        let newStat = [{ name: "全部", stat: "all", active: false }, { name: "未完成", stat: "undo", active: false }, { name: "已完成", stat: "finish", active: false }]
        for (let i = 0; i < newStat.length; i++) {
            if (newStat[i].stat === updateStat)
                newStat[i].active = true;
        }
        setFilterStat(newStat);

    };

    // additem
    function additem() {
        let todo = {};
        todo.content = item;
        const data = JSON.stringify({
            todo
        });
        addAPI(token, data)
            .then((res => {
                getTodo();
            }));

    }

    //worklist
    function onChangeFinished(id) {
        toggleAPI(token, id)
            .then((res) => res.json())
            .then((res) => {
                if (res.message !== "查無資料")
                    getTodo();
            })
    }

    function delItem(id) {
        delAPI(token, id)
            .then((res) => res.json())
            .then((res) => {
                if (res.message === "已刪除")
                    getTodo();
            })
    }

    const statusFilter = () => {
        let Tabs = filterStat.map((filterStat) =>
            <input
                key={filterStat.name}
                className={filterStat.active ? "stausFilter-Active" : "stausFilter-All"}
                type="button"
                onClick={() => changeFilter(filterStat.stat)}
                value={filterStat.name} />
        );
        return Tabs;
    }

    const listItems = () => {
        let filter = "all";
        let list = [];
        for (let i = 0; i < filterStat.length; i++) {
            if (filterStat[i].active === true) {
                filter = filterStat[i].stat;
            }
        }
        if (filter === "undo") {
            filteredItems = newitems.filter((newitems) => newitems.completed_at === null);
        } else if (filter === "finish") {
            filteredItems = newitems.filter((newitems) => newitems.completed_at !== null);
        } else {
            filteredItems = newitems;
        }


        list = filteredItems.map((filteredItems) =>
            <li key={filteredItems.id} className={filteredItems.completed_at === null ? "undo" : "finished"} ><input className="todoList_input" type="checkbox" checked={filteredItems.completed_at === null ? false : true}
                onChange={() => onChangeFinished(filteredItems.id)} />{filteredItems.content}<input className="delbtn" type="button" onClick={() => delItem(filteredItems.id)} value="刪除" />
            </li>
        );

        return list;
    };

    //total undo

    let undoCount = recount();
    function recount() {
        let undo_count;
        if (filterStat[0].active === true || filterStat[1].active === true) {
            undo_count = newitems.filter((newitems) => newitems.completed_at === null);
            return undo_count.length;
        } else {
            return 0;
        }
    };
    const clearAll = async () => {
        newitems.map((items) => {
            if (items.completed_at !== null) {
                delAPI(token, items.id)
                    .then((res) => res.json())
                    .then((res) => {
                        getTodo();
                    })
            }
        });
        changeFilter('all');
        undoCount = recount();
    }

    return (
        <div className="wrap">
            <div className="todolist_header">
                <div className="logoadjust">
                    <img className="todolist_logo "
                        src={'https://github.com/hexschool/webLayoutTraining1st/blob/master/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/logo.png?raw=true'}
                        alt="Todolist_Logo" />
                </div>
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