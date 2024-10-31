import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [datas, setDatas] = useState([])
    const [errors, setErrors] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://api.jikan.moe/v4/anime')
                if (!response.ok) throw new Error('Error fetching data')
                const data = await response.json()
                setDatas(data.data)
            } catch (error) {
                setErrors(error.message)
            } finally {
                setLoading(false)
                document.title = 'Anime List'
            }
        }

        fetchData()
    }, [])

    if (loading) return null
    if (errors) return <p>Error: {errors}</p>

    return (
        <div className="content-container">
            <h2 className="content-title">Latest Release</h2>
            <div className="grid-container">
                {datas.map((anime) => (
                    <Link
                        to={`/anime/${anime.mal_id}`}
                        key={anime.mal_id}
                        target=""
                        className="anime-link"
                    >
                        <div className="anime-item">
                            <img
                                src={anime.images.jpg.image_url}
                                alt={anime.title}
                                className="anime-image"
                            />
                            <div className="anime-info">
                                <h3 className="anime-title">{anime.title}</h3>
                                <p className="anime-synopsis">
                                    {anime.synopsis
                                        ? anime.synopsis.slice(0, 100) + '...'
                                        : 'No synopsis available.'}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home
