import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Details() {
    const { id } = useParams()
    const [anime, setAnime] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await fetch(
                    `https://api.jikan.moe/v4/anime/${id}`,
                )
                if (!response.ok)
                    throw new Error('Error fetching anime details')
                const data = await response.json()
                setAnime(data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchAnime()
    }, [id])

    if (loading) return null
    if (error) return <p>Error: {error}</p>

    document.title = anime.title

    return (
        <div className="detail-container">
            <div className="detail-card">
                <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="detail-image"
                />
                <div className="anime-details">
                    <h2 className="detail-title">
                        {anime.title} ({anime.title_japanese})
                    </h2>
                    <p className="detail-synopsis">{anime.synopsis}</p>
                    <div className="detail-info">
                        <p>
                            <strong>Status:</strong> {anime.status}
                        </p>
                        <p>
                            <strong>Released:</strong> {anime.aired.string}
                        </p>
                        <p>
                            <strong>Type:</strong> {anime.type}
                        </p>
                        <p>
                            <strong>Studio:</strong>{' '}
                            {anime.studios
                                .map((studio) => studio.name)
                                .join(', ')}
                        </p>
                        <p>
                            <strong>Season:</strong>{' '}
                            {anime.season ? anime.season : 'N/A'}
                        </p>
                        <p>
                            <strong>Episodes:</strong> {anime.episodes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
