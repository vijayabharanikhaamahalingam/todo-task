import { useRef, useState,useEffect } from "react";
import Todos from "./Todos"

const Add = () => {
    
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [{cards},setCards] = useState({cards:[]})
    const [index,setIndex] = useState(-1)
    const [status,setStatus] = useState("notCompleted")
    const [selectCss,setSelectCss] = useState("card-notCompleted")
    const [isEdit,setIsEdit]=useState(false)
    const [editIndex,setEditIndex]=useState(0);
    const [filteredCards,setFilteredCards] = useState([])
    

    
    const statusChange=(changedStatus,statusChangeIndex)=>{
     
      const statusChangeData={
        name:name,
        description:description,
        index:statusChangeIndex,
        status:changedStatus

}
      setCards(cardVal=>{
        const edited = cardVal.cards.map(cardEdit=> {
          if(cardEdit.props.data.index === statusChangeIndex) {
            cardEdit = <Todos
            key={statusChangeIndex}
            data={statusChangeData}
            onEdit={edit}
            delete={deleteVal}
            onStatusChange={statusChange}
            />
            return cardEdit
          } else {
            return cardEdit
          }
        }
        )
        return {cards:Array.from(new Set([...edited]))}
      }    
    )
    }

    const handleFilter=(e)=>{

        
        if (e.target.value == "notCompleted"||e.target.value=="all") {
            setSelectCss("card-notCompleted")
          } else {
            setSelectCss("card-completed")
          }
          setFilteredCards(filtered=>{
            const originalSet = new Array(cards).flat();
            const changes = originalSet.filter(item=>!filtered.includes(item));
            if(changes.length==0){
                return filteredCards
            }

            return Array.from(new Set([...originalSet, ...changes]))
          })
          if(e.target.value!="all"){
            console.log(filteredCards)
          let filtered = []
          if(filteredCards.length>0){
            filtered = filteredCards.filter(card=>card.props.data.status == e.target.value).map(data=>data)
          } else {
            filtered = cards.filter(card=>card.props.data.status == e.target.value).map(data=>data)
          }
          
          setCards({cards:[...filtered]})
          }else{
            setCards({cards:[...filteredCards]})
          }
          
    }

    const handleName=(e) => {
        setName(e.target.value)
    }


    const handleDescription=(e) => {
        setDescription(e.target.value)
    }



    const edit=(name,description,index,status)=>{
        setName(name);
        setDescription(description);
        setEditIndex(index);
        setIsEdit(true)
        setStatus(status)
        
    }

    const deleteVal=(deleteIndex)=>{
        console.log(cards)
        setCards(cardVal=>{
          const deletedCards = cardVal.cards?.filter((card,index)=>card.props.data.index!=deleteIndex).map(data=>data)
         return {cards:[...deletedCards]}
        })
      
    }

    const handleSubmit = (e) => {
        const data={
            name:name,
            description:description,
            index:index,
            status:status

    }
    
      

    if(isEdit){
      const editData={
        name:name,
        description:description,
        index:editIndex,
        status:status

}
    setCards(cardVal=>{
      const edited = cardVal.cards.map(cardEdit=> {
        if(cardEdit.props.data.index === editIndex) {
          cardEdit = <Todos
          key={editIndex}
          data={editData}
          onEdit={edit}
          delete={deleteVal}
          onStatusChange={statusChange}
          />
          return cardEdit
        } else {
          return cardEdit
        }
      }
      )
      return {cards:Array.from(new Set([...edited]))}
    }    
  )
    } else {
      setIndex(index+1)
        cards.push(
            <Todos
            key={index}
            data={data}
            onEdit={edit}
            delete={deleteVal}
            onStatusChange={statusChange}
            />
          );
       
          setCards({cards:Array.from(new Set([...cards]))})
    }
      
      setName("")
      setDescription("")
      setStatus("notCompleted")
      setIsEdit(false)
      
    }
    return (
        <div className="contentAlign">
            <input type="text" id="name" placeholder="Task Name" className="me-2" value={name} onChange={handleName} />
            <input type="text" id="description" placeholder="Task Description" className="me-2" value={description} onChange={handleDescription} />
            <button className="btn btn-success btn-sm" onClick={handleSubmit} disabled={!(name && description)}>Add Todo</button>
            {
            (cards.length>0) &&
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row">
                        <div>
                            <span className="fw-bolder float-start">My Todos</span>
                            <div className="float-end">
                            <label to="status" className="">Status filter:</label>
                            <select name="filter" id="filter" onChange={handleFilter} className={selectCss} defaultValue={"all"}>
                                <option  value="all">All</option>
                                <option value="completed">Completed</option>
                                <option value="notCompleted">Not Completed</option>
                            </select>
                            </div>
                        </div>
                        {cards}
                    </div>
                </div>
            </section>
            }
        </div>

    )
}
export default Add