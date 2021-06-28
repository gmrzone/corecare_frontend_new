import useSWR from 'swr';
import style from '../../../styles/blog/index.module.scss'
import backendAPi from '../../../data/backendApi'
import LazyLoadImage from '../../../components/common/LazyLoadImage'
import { BASE_URL } from '../../../data/_variables'
import TopPostSlider from './TopPostSlider'
import Link from 'next/link'
const TopPost = () => {
    const fetcher = (...args) => backendAPi.get(...args).then(response => response.data)
    const {data} = useSWR(`blog/posts/top/8/`, fetcher)

    const renderPosts = data?.map(x => {
        return (
            <Link key={x.id} href={`blog/${x.date_slug.year}/${x.date_slug.month}/${x.date_slug.day}/${x.slug}`}>
                <div className={style.top_post_item} >
                    <div className={style.image_container}>
                        <LazyLoadImage alt_text={x.title} class_name={style.image_placeholder} src={BASE_URL + x.photo}/>
                    </div>
                    <div className={style.top_item_title}>
                        {x.title}
                    </div>
                </div>
            </Link>
        )
    })
    return (
        <div className={style.top_post_container}>
            <h2>Top Posts</h2>
            {renderPosts ? <TopPostSlider data={renderPosts}/> : <div className={style.no_data_placeholder}></div>}
            {/* <div className={style.top_post_outer}>
                {renderPosts}
            </div> */}
        </div>
        )
}

export default TopPost