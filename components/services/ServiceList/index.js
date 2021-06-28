// import CategoryChangeModel from './categoryChangeModel'
import { useEffect, useContext } from 'react';
import style from '../../../styles/service/servicelist/ServiceList.module.scss'
import { BaseCartContext } from '../../../context/basicCartContext';
import SubcategoryHeader from './SubcategoryHeader'
import ServiceContent from './ServiceContent';
import Image from 'next/image';
import Link from 'next/link';
import ServiceCategoryUnavailable from './ServiceCategoryUnavailable';
import { CategoryModalContext } from '../../../context/categoryChangeModal'
const ServiceList = ({ category, active, setActive, reference,  subcategorys, mobileNav, searchParam, services }) => {
    const { baseCart, mutateBaseCart, cartCount } = useContext(BaseCartContext)

    const { openCategoryModel , setModelHeaderText , setReplacementCartItem, incrementReplacedService} = useContext(CategoryModalContext)

    useEffect(() => {
        if (active){
            document.body.style.overflowY = "hidden";
        }
        else {
            document.body.style.overflowY = "auto";
        }
    }, [active])
    

    return (
        <div className={style.service_list_model__main} ref={reference} style={{left: active ? '0%' : '100%'}}>
            {/* <CategoryChangeModel modelActive={categoryChangeModelActive} closeModel={closeCategoryModel} header={modelHeaderText} category={category} replacementItem={replacementCartItem} incrementReplacedService={incrementReplacedService}/> */}
            <div className={style.service_list_main_header}>
                <div className="service-list-close" onClick={() => setActive(!active)}><i className="far fa-arrow-left service-list-close-main" /></div>
                <div className={style.service_list_title}>{category[0].toUpperCase() + category.slice(1)}</div>
                <Link href="/cart">
                    <a className={style.cart_icon_container} onClick={() => setActive(false)}>
                    {/* <img src={cart_image} alt="cart" className="cart-icon" /> */}
                        <Image src="/cart.svg" className={style.cart_icon_img} alt="cart" layout="fill" objectFit="cover" priority={true}/>
                        <div className={style.cart_count + " cart_count"}>{cartCount}</div>
                    </a>
                </Link>
            </div>
            <div className={`${mobileNav ? "" : "ui container"} ${style.service_list_model}`} style={{display: subcategorys?.length === 0 || !subcategorys ? "block" : "grid"}}>
                {subcategorys?.length > 0 ? <SubcategoryHeader data={subcategorys} searchParam={searchParam} /> : <ServiceCategoryUnavailable category={category}/>}
                {subcategorys?.length > 0 ? <ServiceContent category={category} openCategoryModel={openCategoryModel} setModelText={setModelHeaderText} setReplacementCartItem={setReplacementCartItem} incrementReplacedService={incrementReplacedService} services={services} subcategorys={subcategorys} baseCart={baseCart} mutateBaseCart={mutateBaseCart}/> : ""}
            </div>
            <style jsx>{`
                .cart_count {
                    line-height: 1.2;
                    padding: ${cartCount > 10 ? "1px 2px 0px 2px" : cartCount === 0 ? "1px 2px 0px 2px" : cartCount === 10 ? "1px 2px 1px 2px" : "1px 4px 0px 4px"}; 
                    right: ${cartCount > 9 ? "-6px" : "-5px"};
                }
                .service-list-close-main {
                    float: right;
                    cursor: pointer;
                    font-size: ${mobileNav ? "16px" : "18px"}
                }
            `}</style>
        </div>
    )
}

export default ServiceList