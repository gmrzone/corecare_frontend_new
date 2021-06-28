import style from '../../../styles/blog/index.module.scss'
import Link from 'next/link'
import LazyLoadImage from '../../common/LazyLoadImage'
const PostListItem = ({ post, view }) => {
    const {slug,  date_slug : {year, month, day}} = post
    const renderBody = (str) => {
        if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '').substring(0, 100) + " ....";
    }
    return (
        <Link href={`blog/${year}/${month}/${day}/${slug}`}>
            <div className={`card ${style.post_item}`}>
                <div className={`image ${style.image_container}`}>
                    {/* <img src={post.photo} alt={slug}/> */}
                    <LazyLoadImage src={post.photo} alt_text={slug} class_name={style.placeholder}/>
                </div>
                <div className="content">
                <div className={style.head}>{post.title}</div>
                <div className="meta">
                    <a>{post.created}</a>
                </div>
                <div className="description">
                    {renderBody(post.body)}
                </div>
                </div>
                <div className="extra content">
                <span className={`right floated ${style.name}`}>
                    by {post?.author?.username || post?.author?.first_name + " " + post?.author?.last_name || post.name}
                </span>
                <span>
                <i className="eye icon"></i>
                    {view} Views
                </span>
                </div>
            </div>
        </Link>
    )
}

export default PostListItem