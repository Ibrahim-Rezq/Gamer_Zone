import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg-22.jpg'

const AboutPage = () => {
    return (
        <main>
            <PageHero title={'about'} />
            <AboutWrapper className='page section section-center'>
                <img src={aboutImg} alt='aboutImg' />
                <article>
                    <div className='title'>
                        <h2>Our Story</h2>
                        <div className='underline'></div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam ducimus, in atque cumque id aliquam dicta
                        veniam aperiam adipisci deleniti vel beatae minus eos
                        iure necessitatibus alias inventore cum recusandae!
                    </p>
                </article>
            </AboutWrapper>
        </main>
    )
}

const AboutWrapper = styled.section`
    display: grid;
    gap: 4rem;
    img {
        width: 100%;
        display: block;
        border-radius: var(--radius);
        height: 500px;
        object-fit: cover;
    }
    p {
        line-height: 2;
        max-width: 45em;
        margin: 0 auto;
        margin-top: 2rem;
        color: var(--clr-grey-5);
    }
    .title {
        text-align: left;
    }
    .underline {
        margin-left: 0;
    }
    @media (min-width: 992px) {
        grid-template-columns: 1fr 1fr;
    }
`
export default AboutPage
