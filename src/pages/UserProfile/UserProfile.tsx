// @ts-nocheck
import { Post } from '../../components/Post/Post'
import { PostsInput } from '../../components/PostsInput/PostsInput'
import { Profile } from '../../components/Profile/Profile'
import './UserProfile.scss'


const UserProfile: React.FC = () => {

  const postsData = [
    { id: 1, value: 'эта часть сайта в разработке ❗️', likes:15, src: "https://static.gazetametro.ru/media/20220227140236/3650fee74eafe0eecdeb4f5b464be2271574230abcabb467377bd0f9c728c43e.png"},
  ]

  const mappedData = postsData.reduce((acc, item) => {
    return (
      [ <Post key={item.id} value={item.value} likes={item.likes} id={item.id} src={item.src}/>, ...acc]
    )
  }, [])
  return(
    <main className='main UserProfile'>
      <Profile />
      <div className="main__posts">
        <PostsInput title={'My posts'} placeholder={'your news'} btnValue={'add post'}/>
        <div className="posts__last-posts">
          {mappedData}
        </div>
      </div>
    </main>
  )
}

export {UserProfile}