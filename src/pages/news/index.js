import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/shared/Layout';
import NewsRoll from '../../components/NewsRoll';

const Header = styled.div`
  width: 100vw;
  height: 400px;
  background-size: cover;
  background-position: bottom;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
    padding: 1rem;
  }
`;

export default class NewsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Header
          style={{
            backgroundImage: `url('/img/mrc_01.jpg')`,
          }}
        >
          <h1 className="has-text-weight-bold is-size-1 has-primary-background">
            Latest Stories
          </h1>
        </Header>
        <section className="section">
          <div className="container">
            <div className="content">
              <NewsRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
