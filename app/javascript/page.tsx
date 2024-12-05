import React, { Fragment } from 'react';
import H from '../../components/mdxComponents/Headings';
// import { PostMetaTags } from '../../components/MetaTags';
import createSectionedFrontMatter from '../../utils/createSectionedFrontmatter';
import { styled } from '@/styled-system/jsx';
import { getPosts } from '@/lib/getPosts';
import Link from 'next/link';

const TOC = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 2rem;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    a {
      &:before {
        display: none;
      }
    }
  }
`;

export default async function JavaScriptPage(/* { data: { allMdx: javascript }, location } */ ) {
  const { posts } = await getPosts({ type: 'javascript', limit: 1000 });
  console.log(`found ${posts.length} javascript posts`);
  const toc = createSectionedFrontMatter(posts);
  console.log(toc);
  return (
    <>
      <H>JavaScript Notes &amp; Reference</H>
      <p>Hey! Welcome to my Beginner JavaScript Notes + Reference.</p>
      <p>
        These notes are a free resource, based on my <a href="https://BeginnerJavaScript.com"> Beginner JavaScript Video course </a>. They can be used as a stand alone guide, along with the videos or a quick reference for all the different parts of JavaScript like the <a href="/javascript/02-functions/different-ways-to-declare-functions"> different ways to declare a function</a>.
      </p>
      <p>
        The code written in these notes is available in the <a href="https://github.com/wesbos/beginner-javascript"> Beginner JavaScript repo</a> on github.
      </p>
      <p>
        Did I miss something? Think you could add a better example? Find a spelling mistake? All the notes are open source and edits are greatly appreciated!
      </p>
      <TOC>
        {toc.map(([title, items]) => (
          <div key={title}>
            <H as="h3">{title}</H>
            <ul>
              {(items || []).map((item) => (
                <li key={item.frontmatter.tocTitle}>
                  <Link href={`/javascript/${item.frontmatter.slug}`}>{item.frontmatter.tocTitle}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </TOC>

      {/* TODO <PostMetaTags
        post={{
          frontmatter: {
            slug: location.pathname,
            title: `Beginner JavaScript Notes`,
          },
        }}
      /> */}
    </>
  );
}

// export const pageQuery = graphql`
//   query JavaScript {
//     allMdx(filter: { fields: { collection: { eq: "javascript" } } }, sort: { frontmatter: { tocTitle: ASC } }) {
//       nodes {
//         fields {
//           slug
//         }
//         frontmatter {
//           tocTitle
//           slug
//           section
//         }
//       }
//     }
//   }
// `;