//@ts-nocheck
import React from 'react'
import { Post } from '../../components/Post/Post'
import { PostsInput } from '../../components/PostsInput/PostsInput'
import { Profile } from '../../components/Profile/Profile'
import tilesIco from '../../assets/img/icon-tile.png'
import listIco from '../../assets/img/list.png'
import './UserProfile.scss'
import { useMatchMedia } from '../../hooks/use-match-media'


const UserProfile: React.FC = () => {

  const [tiles, setTiles ] = React.useState(false)
  const { isMobile } = useMatchMedia()

  const postsData = [
    { id: 1, value: 'эта часть сайта в разработке ❗️', likes:15, src: "https://static.gazetametro.ru/media/20220227140236/3650fee74eafe0eecdeb4f5b464be2271574230abcabb467377bd0f9c728c43e.png"},
    { id: 2, value: 'эта часть сайта в разработке ❗️', likes:15, src: "https://static.gazetametro.ru/media/20220227140236/3650fee74eafe0eecdeb4f5b464be2271574230abcabb467377bd0f9c728c43e.png"},
    { id: 3, value: 'эта часть сайта в разработке ❗️', likes:15, src: "https://static.gazetametro.ru/media/20220227140236/3650fee74eafe0eecdeb4f5b464be2271574230abcabb467377bd0f9c728c43e.png"},
    { id: 4, value: 'эта часть сайта в разработке ❗️', likes:15, src: "https://static.gazetametro.ru/media/20220227140236/3650fee74eafe0eecdeb4f5b464be2271574230abcabb467377bd0f9c728c43e.png"},
    { id: 5, value: 'эта часть сайта в разработке ❗️', likes:15, src: "https://static.gazetametro.ru/media/20220227140236/3650fee74eafe0eecdeb4f5b464be2271574230abcabb467377bd0f9c728c43e.png"},
  ]

  const mappedData = postsData.reduce((acc, item) => {
    return (
      [ <Post key={item.id} value={item.value} likes={item.likes} id={item.id} src={item.src}/>, ...acc]
    )
  }, [])

  React.useEffect(() => {
    if (isMobile) {
      setTiles(false)
    }
  },[isMobile])

  return(
    <main className='main UserProfile'>
      <Profile />
      <div className="main__posts">
        <PostsInput title={'My posts'} placeholder={'your news'} btnValue={'add post'}/>
        {!isMobile && 
          <img className="tiles-button" height={30} onClick={() => setTiles(prev => !prev)} src={tiles ? listIco : tilesIco } alt="icon" />
        }
        <div className={tiles ? 'posts__last-posts--tiles' : 'posts__last-posts'}>
          {mappedData}
        </div>
      </div>
    </main>
  )
}

export {UserProfile}