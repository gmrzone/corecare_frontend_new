import { useState } from 'react'
import style from '../../styles/cart/Cart.module.scss'
// import { connect } from 'react-redux';
// import { applyCoupon } from '../../actions'
const CouponBox = ({ applyCoupon }) => {
    const [couponValue, setCouponValue] = useState("")
    const [coupon, setCoupon] = useState({loading: false, error: false, mssg: ""})
    const handleCouponApply = () => {
        if (couponValue === ""){
            setCoupon({loading: false, error: true, mssg: "No Coupon Applied"})
        }
        else{
            setCoupon({loading: true, error: false, mssg: ""})
            // applyCoupon(couponValue, setCoupon)
        }
        
    }
    return (
        <div className={style.cart_coupon_apply}>
        <div className="ui action input">
            <input type="text" value={couponValue} placeholder="Apply Coupon" onChange={(e) => setCouponValue(e.target.value)}/>
            <button className={`ui teal right labeled icon button ${coupon.loading ? "loading" : ""}`} onClick={handleCouponApply}>
                <i className="cart icon"></i>
                Apply
            </button>
        </div>
        <div className={`ui mini ${coupon.error ? "red" : "green"} message`} style={{display: coupon.mssg ? "block" : 'none'}}>{coupon.mssg}</div>
    </div>
    )
}

// export default connect(null, { applyCoupon })(CouponBox)
export default CouponBox