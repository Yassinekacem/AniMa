export default function DashboardKibanaPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "16px" }}>Dashboard Kibana</h1>

      <iframe
        src="http://localhost:5601/app/dashboards#/view/e74ba482-be0b-45cf-91bf-64bdf38617d6?embed=true&_g=%28refreshInterval%3A%28pause%3A%21t%2Cvalue%3A60000%29%2Ctime%3A%28from%3Anow-1y%2Fd%2Cto%3Anow%29%29&hide-filter-bar=true"
        style={{
          width: "100%",
          height: "600px",
          border: "none",
        }}
      />
    </div>
  );
}
