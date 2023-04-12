import { request, gql } from "graphql-request";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const query = gql`
  {
    tokens(where: { name_not: "" }, first: 20) {
      id
      nftContract {
        id
      }
      amount
      name
      imageURI
      mintTime
      tokenId
      tokenURI
      owners {
        ownerAccount {
          id
        }
      }
    }
  }
`;
const ENDPOINT =
  "https://api.thegraph.com/subgraphs/name/chainsafe/goerli-all-nft";

// source: https://thegraph.com/hosted-service/subgraph/chainsafe/goerli-all-nft

export default function Nfts() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const queryTheGraph = async () => {
    try {
      setLoading(true);

      const req = await request(ENDPOINT, query);

      const ipfsSrc = req.tokens
        .map((item: any) => ({
          ...item,
          imageURI: item.imageURI.replace("ipfs://", "https://ipfs.io/ipfs/"),
        }))
        .filter((item: any) => item.name && item.imageURI);
      console.log(ipfsSrc);
      setData(ipfsSrc);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queryTheGraph();
  }, []);

  return (
    <main>
      <div className="gallery-title">
        <h1>Very good NFT gallery</h1>
        <Link to="/">go to money</Link>
      </div>

      {loading && (
        <div className="gallery-loader">
          <p>Loading...</p>
        </div>
      )}

      <section className="gallery">
        {data?.map((item) => (
          <div key={item.id}>
            <h3>{item?.name}</h3>
            <p>NFT Contract: {item?.nftContract?.id}</p>
            {item?.imageURI.includes("mp4") ? (
              <video src={item?.imageURI}></video>
            ) : (
              <img loading="lazy" src={item?.imageURI} alt={item.name} />
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
