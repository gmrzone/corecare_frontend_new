import style from '../styles/partner/Partners.module.scss';
import PartnerHero from '../components/partner/PartnerHero';
import Segment from '../components/partner/Segment'
import PartnerCard from '../components/partner/PartnerCard'
import Image from 'next/image';
import { frontend_base } from '../data/_variables'
import MetaComponent from '../components/common/MetaComponent'
import Layout from '../components/common/Layout'

export const getStaticProps = async () => {
    const BASE_URL = process.env.NODE_ENV === 'development' ? process.env['API_BASE_URL'] : process.env['API_BASE_URL_PROD']

    const response = await fetch(`${BASE_URL}v2/category/hiring/`)
    const data = await response.json()
    return {
        props: {
            hiring: data
    }}
}
const BecomeAPartner = ({ hiring, mobileNav }) => {

    const renderHiring = hiring.map(x => {
        return (
            <div key={x.id} className={style.hiring_item}>
                <div className={style.icon}>
                    <Image src={x.icon} alt="hiring" width="80" height="80"/>
                </div>
                <div className={style.name}>{x.name}</div>
            </div>
        )
    })
    return (
        <div>
            <MetaComponent title="Become a partner" description="Home page for corecare Partners" name="Partners Page Page" url={`${frontend_base}/become-a-partner`}/>
                <Layout mobileNav={mobileNav}>
                    <PartnerHero />
                    <Segment>
                        <div className={"ui container " + style.partner_hero_container + " " + style.partner_container_secondary}>
                            <div style={{textAlign: 'center'}}>
                                <h1 className={style.main_title}>Join CoreCare to change your life</h1>
                                <p className={style.description}>CoreCare is an app-based marketplace that empowers professionals like you to become your own boss.</p>
                            </div>
                            <div className={style.stats}>
                                <div className={style.stats_item}>
                                    <h1>30,000+</h1>
                                    <p>Partners already onboard</p>
                                </div>
                                <div className={style.stats_item}>
                                    <h1>&#8377; 566Cr</h1>
                                    <p>Paid out to partnet in 2020</p>
                                </div>
                                <div className={style.stats_item}>
                                    <h1>250,000+</h1>
                                    <p>Service delivered every month</p>
                                </div>
                            </div>
                            <PartnerCard heading="Wondering who can join?" subheading="If you have 1 year of experiance in any of these fields you can join CoreCare.">
                                <div className={style.hiring_section}>
                                    {renderHiring}
                                </div>
                            </PartnerCard>
                        </div>
                    </Segment>
                </Layout>
        </div>
    )
}
// const mapStateToProps = (state) => {
//     return {
//         hiring: state.hiring
//     }
// }
// export default connect(mapStateToProps, { GetHiringCategory })(BecomeAPartner)

export default BecomeAPartner