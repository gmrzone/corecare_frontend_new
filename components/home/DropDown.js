import { useState, useEffect } from 'react'
import style from '../../styles/common/Dropdown.module.scss'
const Dropdown = ({ register,  selected, options, selectionChange })=> {
    const [open, setOpen] = useState(false)
    let renderedOpt = options.map((x, i) => {
        return selected?.value !== x.value ? <span className={style.dropdown_item} key={i} value={x.value} onClick={() => selectionChange(x)}>{x.name}</span> : ""
    })
    const toggleDropDown = (e) => {
        e.stopPropagation()
        setOpen(!open)
    }
    useEffect(() => {
        const CloseDropDown = () => {
            setOpen(false)
        }
        document.body.addEventListener('click', CloseDropDown)

        return () => {
            document.body.removeEventListener('click', CloseDropDown)
        }
    }, [open])
    return(
        // <div className={`input huge ui selection dropdown ${open ? "visible active" : ""}`} onClick={toggleDropDown} onChange={() => console.log("Afzal")}>
        //     <i className="dropdown icon"></i>
        //     <div className="default Text">{selected.name}</div>
        //     <div className={`menu ${open ? "visible transition" : ""}`} onChange={() => console.log("Changed")} name="city">
        //         {renderedOpt}
        //     </div>
        // </div>
        <div className={style.dropdown_main} onClick={toggleDropDown}>
            <img src="/india.svg" alt="india_icon" className={style.india_icon}/>
            <span>{selected?.value[0].toUpperCase() + selected?.value.substring(1) || "Select City"}</span>
            <i className="fa fa-caret-down" aria-hidden="true" />
            <div className={style.dropdown_options + ` ${open ? style.active : ""}`}>
                {renderedOpt}
            </div>  
        </div>
    )
}

export default Dropdown