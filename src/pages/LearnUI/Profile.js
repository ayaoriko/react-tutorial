// 名前付きエクスポートは好きなだけ置くことができます。
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export function ProfileChallenge(personProfile) {
  return (
    <section className="profile">
      <h2>{{ personProfile }}</h2>
    </section>
  );
}