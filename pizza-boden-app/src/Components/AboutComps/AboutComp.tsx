import './AboutComp.css'
import AboutImg from '../../assets/image.png'

function AboutComp() {
    return (
        <>
            <section className="about-section">
                <aside className="about-section-top">
                    <h1 className="about-section-top-title">Våran Historia</h1>
                </aside>
                <aside className="about-section-text">Lorem ipsum dolor sit amet
                     consectetur adipisicing elit. Amet, quisquam. Lorem ipsum dolor sit amet, 
                     consectetur adipisicing elit. Nemo voluptas voluptatem, repellendus 
                     nostrum error laudantium. Voluptatem eos odit recusandae repellendus.
                </aside>
                <section className="about-info-section">
                    <img src={AboutImg} alt="" className="about-info-section-img" />
                    <p className="about-info-section-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, rerum minus? 
                        Enim modi eaque doloremque sequi ab tempora voluptatum quasi ipsum, 
                        minus ea nemo quaerat in vero odio ad odit accusantium eius atque, dolor quam qui nihil molestias. 
                        Qui, officiis?
                    </p>
                </section>
            </section>
        </>
    )
}

export default AboutComp

/**
 * Författare: Victor
 * Design till om oss sidan
 */