<?php
class RegisterUser{
    private $username;
    private $hardiness_zone;
    private $lastfrost;
    private $firstfrost;
    private $password_raw;
    private $encrypted_password;
    public $error;
    public $success;
    private $storage = "users.json";
    private $stored_users;
    private $new_user;

    public function __construct($username, $password, $hzone, $lastfrost, $firstfrost) {
        $this->username = trim($this->username);
        $this->username = filter_var($username, FILTER_UNSAFE_RAW);
        $this->password_raw = filter_var(trim($password), FILTER_UNSAFE_RAW);
        $this->encrypted_password = password_hash($this->password_raw, PASSWORD_DEFAULT);
        $this->stored_users = json_decode(file_get_contents($this->storage), true);
        $this->hardiness_zone = $hzone;
        $this->lastfrost = $lastfrost;
        $this->firstfrost = $firstfrost;
        $this->new_user = [
            "username" => $this->username,
            "password" => $this->encrypted_password,
            "hardiness_zone" => $this->hardiness_zone,
            "last_frost" => $this->lastfrost,
            "first_frost" => $this->firstfrost
        ];
        if($this->checkFieldValues()){
            $this->insertUser();
        }
    }
    private function checkFieldValues() {
        if(empty($this->username) || empty($this->password_raw)){
            return false;
        } else {
            return true;
        }
    }
    private function usernameExists(){
        foreach($this->stored_users as $user) {
            if ($this->username == $user['username']){
                $this->error = "This username is already in use.";
                return true;
            }
        }
        return false;
    }
    private function insertUser(){
        if($this->usernameExists() == FALSE) {
            array_push($this->stored_users, $this->new_user);
            if(file_put_contents($this->storage, json_encode($this->stored_users, JSON_PRETTY_PRINT))){
                session_start();
                $_SESSION['user'] = $this->username;
                header("location: LiberHerbarum.php"); exit();
            } else {
                return $this->error = "Something went wrong, please try again.";
            }
        }
    }
}