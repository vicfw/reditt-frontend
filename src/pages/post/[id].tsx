import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";

const SinglePost = () => {
  return <div>SinglePost</div>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(SinglePost);
