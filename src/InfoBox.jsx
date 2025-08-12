import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SunnyIcon from "@mui/icons-material/Sunny";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import FoggyIcon from "@mui/icons-material/Foggy";

export default function InfoBox({ info }) {
  const INIT_URL =
    "https://images.unsplash.com/photo-1561553543-e4c7b608b98d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const HOT_URL =
    "https://images.unsplash.com/photo-1524594081293-190a2fe0baae?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const COLD_URL =
    "https://images.unsplash.com/photo-1603726574752-a85dc808deab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const COULDY_URL =
    "https://images.unsplash.com/photo-1561553543-e4c7b608b98d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const RAIN_URL =
    "https://images.unsplash.com/photo-1600276871076-49d461d70795?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const FOGGY_URL =
    "https://plus.unsplash.com/premium_photo-1669719011414-2b7e687bd9c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="InfoBox">
      <div className="card-container">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={
              info.humidity >= 80 && info.humidity <= 90
                ? COULDY_URL
                : info.humidity > 90
                  ? RAIN_URL
                  : info.temp > 15
                    ? HOT_URL
                    : info.temp < 15
                      ? COLD_URL
                      : FOGGY_URL
            }
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <div className="location">
                <span className="icon">
                  {info.humidity >= 80 && info.humidity <= 90 ? (
                    <ThunderstormIcon />
                  ) : info.humidity > 90 ? (
                    <WaterDropIcon />
                  ) : info.temp > 15 ? (
                    <SunnyIcon />
                  ) : info.temp < 15 ? (
                    <AcUnitIcon />
                  ) : (
                    <FoggyIcon />
                  )}
                </span>
                <span className="name">{info.city}</span>
              </div>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component={"span"}
            />
            <div>Temperature = {info.temp}</div>
            <div>Humidity = {info.humidity}&deg;C</div>
            <div>Min Temp = {info.tempMin}</div>
            <div>Max Tempe = {info.tempMax}</div>
            <div>
              The weather can be described as <i>{info.weather}</i> and feels
              like = {info.feelslike}&deg;C
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
