<?php
//Fill this place

//****** Hint ******
//connect database and fetch data here

$_mysqli = mysqli_connect('localhost','root','');
mysqli_select_db($_mysqli,'travel');

//如果需要手动导入的代码
//$_sql = file_get_contents('sql/travel-small.sql');
//$_arr = explode(';',$_sql);
//set_time_limit(0);
//foreach ($_arr as $_value){
//    $_mysqli -> query($_value.';');
//}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 14</title>

      <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/bootstrap.min.css" />



    <link rel="stylesheet" href="css/captions.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.css" />

</head>

<body>
    <?php include 'header.inc.php'; ?>



    <!-- Page Content -->
    <main class="container">
        <div class="panel panel-default">
          <div class="panel-heading">Filters</div>
          <div class="panel-body">
            <form action="Lab10.php" method="get" class="form-horizontal">
              <div class="form-inline">
              <select name="continent" class="form-control">
                <option value="0">Select Continent</option>
                <?php
                //Fill this place

                //****** Hint ******
                //display the list of continents
                $sqlContinentName = "select * FROM Continents";
                $result = $_mysqli ->  query($sqlContinentName);
                while($row = $result->fetch_assoc()) {
                  echo '<option value=' . $row['ContinentCode'] . '>' . $row['ContinentName'] . '</option>';
                }

                ?>
              </select>

              <select name="country" class="form-control">
                <option value="0">Select Country</option>
                <?php
                //Fill this place

                //****** Hint ******
                /* display list of countries */
                $sqlCountryName = "select * FROM Countries";
                $result = $_mysqli -> query($sqlCountryName);
                while($row = $result->fetch_assoc()) {
                    echo '<option value=' . $row['ISO'] . '>' . $row['CountryName'] . '</option>';
                }

                ?>
              </select>
              <input type="text"  placeholder="Search title" class="form-control" name=title>
              <button type="submit" class="btn btn-primary">Filter</button>
              </div>
            </form>

          </div>
        </div>


		<ul class="caption-style-2">
            <?php
            //Fill this place

            //****** Hint ******
            /* use while loop to display images that meet requirements ... sample below ... replace ???? with field data*/
            error_reporting(0);

//            $sqlImageDetails = "select * FROM ImageDetails";
//            $result = $_mysqli -> query($sqlImageDetails);
//            echoPics($result);



            $choosedContinent = $_GET["continent"];
            $choosedCountry = $_GET["country"];


//以下代码用于测试
//echo $choosedContinent;
//echo  $choosedCountry;
//            if($choosedContinent != '0' && $choosedCountry === "0"){
//                echo "true";
//            }else{
//                echo "false";
//            }
//            if($choosedContinent === "0" && $choosedCountry != '0'){
//                echo "true";
//            }else{
//                echo "false";
//            }
//            if($choosedContinent === "0" && $choosedCountry === "0"){
//                echo "true";
//            }else{
//                echo "false";
//            }
//            if($choosedContinent != '0' && $choosedCountry != '0'){
//                echo "true";
//            }else{
//                echo "false";
//            }


            if($choosedContinent != '0' && $choosedCountry === "0"){
                $sqlImageDetails = "select * FROM ImageDetails WHERE ContinentCode = '".$choosedContinent."'";
                $result = $_mysqli -> query($sqlImageDetails);
                echoPics($result);
            }
            if($choosedContinent === "0" && $choosedCountry != '0'){
                $sqlImageDetails = "select * FROM ImageDetails WHERE CountryCodeISO = '".$choosedCountry."'";
                $result = $_mysqli -> query($sqlImageDetails);
                echoPics($result);
            }
            if(($choosedContinent === "0" && $choosedCountry === "0")||($choosedContinent == "" && $choosedCountry == "")){
                $sqlImageDetails = "select * FROM ImageDetails";
                $result = $_mysqli -> query($sqlImageDetails);
                echoPics($result);
            }
            if($choosedContinent != '0' && $choosedCountry != '0'){
                $sqlImageDetails = "select * FROM ImageDetails WHERE CountryCodeISO = '{$choosedCountry}' and ContinentCode ='{$choosedContinent}'";
                $result = $_mysqli -> query($sqlImageDetails);
                echoPics($result);
            }

            function echoPics($arg){

                while ($row = $arg->fetch_assoc()){
                    echo '
                <li>
              <a href="detail.php?id='.$row['ImageID'].'" class="img-responsive">
                <img src="images/square-medium/'.$row['Path'].'" alt="'.$row['Title'].'">
                <div class="caption">
                  <div class="blur"></div>
                  <div class="caption-text">
                    <p>'.$row['Description'].'</p>
                  </div>
                </div>
              </a>
            </li>       
                ';
            }





            }



            ?>
       </ul>


    </main>

    <footer>
        <div class="container-fluid">
                    <div class="row final">
                <p>Copyright &copy; 2017 Creative Commons ShareAlike</p>
                <p><a href="#">Home</a> / <a href="#">About</a> / <a href="#">Contact</a> / <a href="#">Browse</a></p>
            </div>
        </div>


    </footer>


        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</body>

</html>