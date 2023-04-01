import { Link } from "react-router-dom"

export default function NewsCard(props){
    //console.log(props.dadescription)
    const img_style = {
        width: '100px',
    }

    return (
        <div className="newscards">
            <img src={props.data.image_url} alt="" style={img_style}/>
            <p>{props.data.title}</p>
            <p>By: {props.data.author}</p>
            <Link to={props.article_url}>Full Article</Link>
        </div>
        
    )

}