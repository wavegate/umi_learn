import TextInput from "../../components/TextInput";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { history } from "umi";
import Button from "../../components/Button";

export default function () {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!document.cookie.includes("token")) {
      alert("请先登录");
      history.push("/login");
    }
  }, []);

  async function submit() {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(","),
          imageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        console.error(await res.text());
        alert("发布失败");
        return;
      }
      history.push("/posts/" + (await res.json()).id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="container lg:px-64 px-8 pt-16">
        <p className="text-3xl font-extrabold">Create post</p>
        <p className="mt-8">Title</p>
        <TextInput value={title} onChange={setTitle} />
        <p className="mt-8">Content</p>
        <TextInput textArea value={content} onChange={setContent} />
        <p className="mt-8">Tags (separated by commas)</p>
        <TextInput value={tags} onChange={setTags} />
        <p className="mt-8">Image URL</p>
        <TextInput value={imageUrl} onChange={setImageUrl} />
        <img src={imageUrl} alt="" />
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  );
}
