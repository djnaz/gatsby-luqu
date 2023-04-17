import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as styles from '../styles/homepage.module.scss'

export default function WorkBlock() {
  const data = useStaticQuery(graphql`
    {
      allWpWork {
        nodes {
          id
          work {
            client
            newWork
            image {
                sourceUrl
            }
            showVideo
            videoPosterImage {
              uri
            }
            videoUrl
          }
        }
      }
    }
  `);

  const workItems = data.allWpWork.nodes;

  return (
    <section>
      <div className={styles.workItems}>
        {workItems.map((workItem) => (
          <div className={styles.workItem} key={workItem.id}>
            { 
                workItem.work.showVideo
                ? 
                <video width="960" height="540" autoPlay muted playsInline loop>
                    <source src={ workItem.work.videoUrl } type="video/mp4" />
                </video>
                :
                <picture>
                    <img src={ workItem.work.image.sourceUrl } alt="" />
                </picture>
            }
          </div>
        ))}
      </div>
    </section>
  );
}
