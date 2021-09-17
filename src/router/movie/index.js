export default{
    path : '/movie',
    component : () => import ('@/views/Movie'),
    children : [
        {
            path : 'city',
            component : () => import ('@/components/City'),
        },
        {
            path : 'comingsoon',
            component : () => import ('@/components/Comingsoon'),
        },
        {
            path : 'nowplaying',
            component : () => import ('@/components/Nowplaying'),
        },
        {
            path : 'search',
            component : () => import ('@/components/Search'),
        },
        {
            path : '/movie',
            redirect : '/movie/nowplaying'
        }
    ]
}