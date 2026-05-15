import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import InputError from "@/ui_components/InputError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLead, updateLead } from "@/services/apiCrm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";
import LoginPage from "./LoginPage";

const CreateLeadPage = ({ blog, isAuthenticated }) => {
  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: blog ? blog : {},
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const blogID = blog?.id;

  const updateMutation = useMutation({
    mutationFn: ({ data, id }) => updateLead(data, id),
    onSuccess: () => {
      navigate("/");
      toast.success("Your post has been updated successfully!");
      console.log("Your post has been updated successfully!");
    },

    onError: (err) => {
      toast.error(err.message);
      console.log("Error updating blog", err);
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => createLead(data),
    onSuccess: () => {
      toast.success("New post added successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
  });

  function onSubmit(data) {
    console.log(data);
    const formData = new FormData();
    formData.append("status", data.status || "New");
    formData.append("lead_name", data.lead_name);
    formData.append("notes", data.notes);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("company", data.company);

    mutation.mutate(formData);
    // if (lead && leadID) {
    //   updateMutation.mutate({ data: formData, id: leadID });
    // } else {
    //   mutation.mutate(formData);
    // }
  }

  if (isAuthenticated === false) {
    return <LoginPage />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        blog && "h-[90%] overflow-auto"
      }  md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl max-sm:text-xl">
          {blog ? "Update Lead" : "Create Lead"}
        </h3>

        <p className="max-sm:text-[14px]">
          {blog
            ? "Do you want to update your post?"
            : "Create a new lead for your CRM system."}
        </p>
      </div>

      <div>
        <Label htmlFor="lead_name" className="dark:text-[97989F]">
          lead_name
        </Label>
        <Input
          type="text"
          id="lead_name"
          {...register("lead_name", {
            required: "Blog's lead_name is required",
            minLength: {
              value: 3,
              message: "The lead_name must be at least 3 characters",
            },
          })}
          placeholder="Give your post a lead_name"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px] max-sm:w-[300px] max-sm:text-[14px]"
        />

        {errors?.lead_name?.message && (
          <InputError error={errors.lead_name.message} />
        )}
      </div>
      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A]"
        />
        {errors?.email?.message && <InputError error={errors.email.message} />}
      </div>

      <div className="w-full">
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="text"
          id="phone"
          {...register("phone", {
            required: "Phone is required",
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A]"
        />
        {errors?.phone?.message && <InputError error={errors.phone.message} />}
      </div>

      <div className="w-full">
        <Label htmlFor="company">Company</Label>
        <Input
          type="text"
          id="company"
          {...register("company")}
          className="border-2 border-[#141624] dark:border-[#3B3C4A]"
        />
      </div>
      <div>
        <Label htmlFor="notes">notes</Label>
        <Textarea
          id="notes"
          placeholder="Write your blog post"
          {...register("notes", {
            required: "Blog's notes is required",
            minLength: {
              value: 10,
              message: "The notes must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[400px] text-justify max-sm:w-[300px] max-sm:text-[14px]"
        />
        {errors?.notes?.message && <InputError error={errors.notes.message} />}
      </div>

      <div className="w-full">
        <Label htmlFor="status">status</Label>

        <Select
          onValueChange={(value) =>
            setValue("status", value, { shouldValidate: true })
          }
          defaultValue="New"
          // defaultValue={blog ? blog.status : ""}
        >
          <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors?.status?.message && (
          <InputError error={errors.status.message} />
        )}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        {blog ? (
          <button
            disabled={updateMutation.isPending}
            className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2"
          >
            {updateMutation.isPending ? (
              <>
                {" "}
                <SmallSpinner />{" "}
                <SmallSpinnerText text="Updating post..." />{" "}
              </>
            ) : (
              <SmallSpinnerText text="Update lead" />
            )}
          </button>
        ) : (
          <button
            disabled={mutation.isPending}
            className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <>
                {" "}
                <SmallSpinner />{" "}
                <SmallSpinnerText text="Creating lead..." />{" "}
              </>
            ) : (
              <SmallSpinnerText text="Create Lead" />
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateLeadPage;
