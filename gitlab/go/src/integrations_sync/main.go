package main

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/ghodss/yaml"
	"github.com/google/go-github/github"
	flags "github.com/spf13/pflag"
	"golang.org/x/oauth2"
	"io"
	"io/ioutil"
	//"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func get_integration(integration string, integration_path string) string {

	var buffer bytes.Buffer

	integrations_core_dir := integration_path

	if _, err := os.Stat(integrations_core_dir + "/" + integration + "/metadata.csv"); err == nil {

		dat, err := os.Open(integrations_core_dir + "/" + integration + "/metadata.csv")

		check(err)

		type Metric struct {
			Metric_name   string `json:"metric_name"`
			Metric_type   string `json:"metric_type"`
			Interval      string `json:"interval"`
			Unit_name     string `json:"unit_name"`
			Per_Unit_name string `json:"per_unit_name"`
			Description   string `json:"description"`
		}

		csvcontent, err := csv.NewReader(dat).ReadAll()
		check(err)

		metrics := []Metric{}

		for i, col := range csvcontent {
			if i == 0 {

				continue
			}
			p := Metric{col[0], col[1], col[2], col[3], col[4], col[5]}

			metrics = append(metrics, []Metric{p}...)
		}

		data := map[string]interface{}{
			integration: metrics,
		}

		res1a, _ := json.MarshalIndent(data, "", "   ")

		y, rerr := yaml.JSONToYAML(res1a)
		check(rerr)

		d1 := []byte(y)
		ioutil.WriteFile("data/integrations/"+integration+".yaml", d1, 0644)

	}
	return string(buffer.String())

}
func downloadFile(filepath string, url string) (err error) {

	out, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer out.Close()

	resp, err := http.Get(url)

	if err != nil {
		return err

	}
	defer resp.Body.Close()

	_, err = io.Copy(out, resp.Body)
	if err != nil {
		return err
	}

	return nil
}

func Unzip(archive, target string) error {

	reader, err := zip.OpenReader(archive)
	if err != nil {
		return err
	}

	if err := os.MkdirAll(target, 0755); err != nil {
		return err
	}
	for _, file := range reader.File {
		path := filepath.Join(target, file.Name)
		file.FileInfo().Name()
		if file.FileInfo().IsDir() {
			os.MkdirAll(path, file.Mode())
			continue
		}

		fileReader, err := file.Open()
		if err != nil {

			if fileReader != nil {
				fileReader.Close()
			}

			return err
		}

		targetFile, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.Mode())
		if err != nil {
			fileReader.Close()

			if targetFile != nil {
				targetFile.Close()
			}

			return err
		}

		if _, err := io.Copy(targetFile, fileReader); err != nil {
			fileReader.Close()
			targetFile.Close()

			return err
		}
		//fmt.Println(targetFile.Name())
		fileReader.Close()
		targetFile.Close()
	}
	return nil
}

var token string
var flag_repo_name = "dogweb"
var flag_integrations_core string

func token_init() {

	flags.StringVar(&token, "token", "", "Github access token without quotes")

	flags.StringVar(&flag_integrations_core, "integrations", "", "Path to integrations-core repo folder")
}

func exists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return true, err
}

func parse_csv_to_yaml(integration string, csv_file string) {

	_, err := exists(csv_file)

	if err != nil {
		fmt.Println(err)
	}

	dat, err := os.Open(csv_file)

	if err != nil {

		fmt.Println("Open file error", integration, err)
		os.Exit(1)

	}

	type Metric struct {
		Metric_name   string `json:"metric_name"`
		Metric_type   string `json:"metric_type"`
		Interval      string `json:"interval"`
		Unit_name     string `json:"unit_name"`
		Per_Unit_name string `json:"per_unit_name"`
		Description   string `json:"description"`
	}

	csvrows, _ := csv.NewReader(dat).ReadAll()

	metrics := []Metric{}

	for i, col := range csvrows {
		if i == 0 {
			continue
		}
		//fmt.Println(col)
		//fmt.Println("In loop")
		m := Metric{col[0], col[1], col[2], col[3], col[4], col[5]}

		metrics = append(metrics, []Metric{m}...)
	}

	data := map[string]interface{}{
		integration: metrics,
	}

	res1a, _ := json.MarshalIndent(data, "", "   ")

	y, rerr := yaml.JSONToYAML(res1a)
	if rerr != nil {
		fmt.Printf("err: %v\n", rerr)

	}

	d1 := []byte(y)

	ioutil.WriteFile("data/integrations/"+integration+".yaml", d1, 0644)

}

func main() {

	token_init()

	flags.Parse()

	const docs_integrations_path = "content/integrations"

	docs_exists, _ := exists(docs_integrations_path)
	if docs_exists == false {
		fmt.Println("Documentation folder content/integrations not found")
		os.Exit(1)
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)

	client := github.NewClient(tc)

	newopt := new(github.RepositoryContentGetOptions)
	newopt.Ref = "master"

	if token != "" {

		repos, _, err := client.Repositories.Get(ctx, "DataDog", flag_repo_name)

		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		ref, _, err := client.Git.GetRefs(ctx, "DataDog", flag_repo_name, "refs/heads/master")

		check(err)

		repo_tar, _, err := client.Repositories.GetArchiveLink(
			ctx, "DataDog", flag_repo_name, github.Zipball, newopt)

		repo_name := repos.GetName()

		ref_json, _ := json.Marshal(ref)

		data := github.Reference{}
		s := string(ref_json)
		json.Unmarshal([]byte(s), data)

		json_str := strings.Trim(string(ref_json), "[]")
		bytes := []byte(json_str)

		var p github.Reference
		un_marshal_err := json.Unmarshal(bytes, &p)

		check(un_marshal_err)

		clean_download_url := strings.Split(repo_tar.String(), "?")
		fmt.Printf("Downloading master from %s \n", clean_download_url[0])

		file := fmt.Sprintf("%s.zip", repo_name)

		downloadFile(file, repo_tar.String())

		pwd, _ := os.Getwd()

		zip_err := Unzip(file, pwd)

		check(zip_err)

		private_repo_folder := "Datadog-" + repo_name + "-" + *p.Object.SHA

		dogweb_integration_folder := private_repo_folder + "/integration"

		filepath.Walk(dogweb_integration_folder, func(path string, info os.FileInfo, err error) error {

			if !info.IsDir() {

				pwd, _ := os.Getwd()

				matched, err := filepath.Match("*metadata.csv", info.Name())

				var filename = info.Name()
				var extension = filepath.Ext(filename)
				var name = filename[0 : len(filename)-len(extension)]

				name = strings.Replace(name, "_metadata", "", -1)

				integration := name

				if err != nil {
					fmt.Println(err)
					return err
				}

				if matched {

					parse_csv_to_yaml(integration, pwd+"/"+path)

				}
			}

			return nil
		})

		os.RemoveAll(private_repo_folder)
		os.RemoveAll("dogweb.zip")
		os.Exit(0)
	}

	if flag_integrations_core == "" && token == "" {

		fmt.Println("Integrations folder path not set, downloading repo")

		client := github.NewClient(nil)

		repos, _, err := client.Repositories.Get(ctx, "DataDog", "integrations-core")

		check(err)

		ref, _, err := client.Git.GetRefs(ctx, "DataDog", "integrations-core", "refs/heads/master")

		check(err)

		repo_tar, _, err := client.Repositories.GetArchiveLink(ctx, "DataDog", "integrations-core", github.Zipball, newopt)

		check(err)

		repo_name := repos.GetName()

		ref_json, _ := json.Marshal(ref)

		data := github.Reference{}
		s := string(ref_json)
		json.Unmarshal([]byte(s), data)

		json_str := strings.Trim(string(ref_json), "[]")
		bytes := []byte(json_str)

		var p github.Reference
		int_core_unmarshall_err := json.Unmarshal(bytes, &p)
		check(int_core_unmarshall_err)

		fmt.Printf("Downloading master from %s \n", repo_tar)

		file := fmt.Sprintf("%s.zip", repo_name)

		downloadFile(file, repo_tar.String())

		pwd, _ := os.Getwd()

		zip_err := Unzip(file, pwd)

		check(zip_err)

		ddintfolder, err := filepath.Glob("DataDog-integrations-core-*")

		filepath.Walk(ddintfolder[0], func(path string, info os.FileInfo, err error) error {

			if !info.IsDir() {

				pwd, _ := os.Getwd()

				matched, err := filepath.Match("*metadata.csv", info.Name())

				if err != nil {
					fmt.Println(err)
					return err
				}

				if matched {
					integration := strings.Split(path, "/")
					parse_csv_to_yaml(integration[1], pwd+"/"+path)

				}
			}

			return nil
		})

		os.RemoveAll(ddintfolder[0])
		os.RemoveAll("integrations-core.zip")

	}

	if flag_integrations_core != "" && token == "" {

		integration_folder_exists, _ := exists(flag_integrations_core)
		if integration_folder_exists == false {
			fmt.Println("Integration folder not found")
			os.Exit(1)
		}

		fmt.Println("Loading csv's from local integratinos-core folder")
		filepath.Walk(flag_integrations_core, func(path string, info os.FileInfo, err error) error {

			if !info.IsDir() {

				matched, err := filepath.Match("*metadata.csv", info.Name())

				if err != nil {
					fmt.Println(err)
					return err
				}

				if matched {

					integration_slice := strings.Split(path, "/")

					integration := integration_slice[len(integration_slice)-2]

					parse_csv_to_yaml(integration, path)

				}
			}

			return nil
		})
		os.Exit(0)
	}

}
