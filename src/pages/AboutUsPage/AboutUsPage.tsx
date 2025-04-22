import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Text from 'components/Text';
import chellImg from 'assets/chell.jpg';
import pepeImg from 'assets/pepe.jpg';
import kapiImg from 'assets/kapi.jpg';
import Medal from './components/Medal';
import * as s from './AboutUsPage.module.scss';

const AboutUsPage = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <section className={s.hero}>
        <Text view="title" className={s.hero__title}>
          About Us
        </Text>
        <Text view="p-20" color="secondary" className={s.hero__subtitle}>
          Learn more about our company and our amazing team
        </Text>
      </section>

      {/* Company Info Section */}
      <section className={s.company}>
        <div className={s.company__content}>
          <Medal />
          <Text view="title" tag="h2" className={s.company__title}>
            Our Story
          </Text>
          <Text view="p-20" className={s.company__text}>
            Founded in 2024, our company has been at the forefront of e-commerce innovation. We started with a simple
            mission: to make online shopping more accessible, enjoyable, and efficient for everyone. Today, we're proud
            to serve millions of customers worldwide with our carefully curated selection of products and exceptional
            customer service.
          </Text>
          <Text view="p-20" className={s.company__text}>
            Our commitment to quality, sustainability, and customer satisfaction has helped us grow into one of the
            leading e-commerce platforms in the industry.
          </Text>
        </div>
      </section>

      {/* Team Section */}
      <section className={s.team}>
        <Text view="title" tag="h2" className={s.team__title}>
          Meet Our Team
        </Text>
        <div className={s.team__container}>
          <div className={s.team__member}>
            <img className={s.team__photo} src={chellImg} alt="John Doe" />
            <Text view="p-20" weight="bold" className={s.team__name}>
              John Doe
            </Text>
            <Text view="p-16" color="secondary">
              CEO & Founder
            </Text>
          </div>
          <div className={s.team__member}>
            <img className={s.team__photo} src={pepeImg} alt="Jane Smith" />
            <Text view="p-20" weight="bold" className={s.team__name}>
              Jane Smith
            </Text>
            <Text view="p-16" color="secondary">
              CTO
            </Text>
          </div>
          <div className={s.team__member}>
            <img className={s.team__photo} src={kapiImg} alt="Mike Johnson" />
            <Text view="p-20" weight="bold" className={s.team__name}>
              Mike Johnson
            </Text>
            <Text view="p-16" color="secondary">
              Head of Design
            </Text>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={s.video}>
        <Text view="title" tag="h2" className={s.video__title}>
          Our Mission
        </Text>
        <div className={s.video__container}>
          <iframe
            src="https://vk.com/video_ext.php?oid=-197257188&id=456239383&hd=2&t=57s&autoplay=1"
            width="853"
            height="480"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
