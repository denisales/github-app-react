import React from 'react'

const Page = ({ page, pageLink, onClick }) => {
    const isDots = page === '...'
    const handleClick = !onClick ? null : (e) => {
        e.preventDefault()
        onClick(page)
    }
    return (
        <>
            {
                isDots
                    ?
                    <span className="pagination-link">{page}</span>
                    :
                    <a className="pagination-link" href={pageLink} onClick={handleClick}>{page}</a>
            }
        </>
    )
}



export default Page