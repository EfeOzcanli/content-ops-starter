export default function TestFormPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Test form</h1>
      <form name="testform" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="testform" />
        <p>
          <input type="text" name="name" placeholder="Name" />
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </main>
  );
}
