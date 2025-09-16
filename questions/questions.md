*Question 1*  

 
From: marissa@startup.com  
Subject:  Bad design  

Hello,  
  
Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.  
   
Thanks,  
Marissa  

---------------------------------------------------------------------------------------------------------------------------------------

*Answer 1*:

Hey Marissa!

Thank you for taking the time to share that feedback with us! There is no need to be sorry! We value all of our customer's feedback and we want to know if something is not working as well as it could. I know that clearing and deleting indexes is a big part of your iteration process right now and we have been looking for ways to improve this, so I can see why you are frustrated that it seems we have taken a step back. 

Our product team decided to make these changes to improve the dashboard for the majority of use cases, but we absolutely recognize that power users like you sometimes need faster access to bulk actions. I’ve shared your feedback with our product team so they can consider this use case as they continue improving the experience. I will also keep an eye out for other customers that may be voicing a similar frustration so that we can track how impactful this change is. 

In the meantime, you might find it faster to clear or delete indexes programmatically using the API. That would be the best way to pair those jobs down to a single command. An example of deleting an index with javascript would look something like this...


```
client.deleteIndex('<your_index_name>').then(() => {
  console.log('Index deleted');
});
```

This is also possible with the CLI as well. That would look like this...
```
algolia index delete your_index_name
```

Would you like me to help you set up a quick script or CLI workflow to speed this for you?


Best regards,
Garrett Hudson
Customer Success Engineer @ Algolia

  
------------------------------------------------------------------------------------------------------------------------------------------

*Question 2*:   
  
From: carrie@coffee.com  
Subject: URGENT ISSUE WITH PRODUCTION!!!!  
  
Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".  
  
Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?  
  
Please advise on how to fix this. Thanks.   

  
------------------------------------------------------------------------------------------------------------------------------------------

*Answer 2*:

Hey Carrie!

Thank for reaching out to me with this issue! I get how critical this is for your production environment so I'm here to help get this sorted out ASAP.

The error message you’re seeing ("Record is too big, please contact enterprise@algolia.com") is usually triggered when a single record exceeds Algolia’s maximum record size limit of 100 KB. Based on what you are describing, this is likely being caused by the metadata you are adding to the reviews. https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits

I have a few steps that you can follow to get this resolved.

-First, I would log the payload being sent to Algolia so that you can check the size of the rescords that are causing the errors. 

-Then you can remove the fields that aren’t needed for search. If you still want to store metadata but you don't need to use it for search, consider using an external storage solution and store only an identifier in Algolia. This would greatly reduce the record size and avoid these errors going forward. Another trick would be to truncate excessively long text fields or split them into multiple records.

-If you can send me one or two failing records, I can suggest an optimal structure to stay under the size limit while preserving your search experience.

Because this is happening on your production environment, I’m also escalating this internally so our support and product teams are aware.

Once you send us some examples we can make specific suggestions to clear up those errors and get you your website back to being fully operational


Best regards,
Garrett Hudson
Customer Success Engineer @ Algolia


------------------------------------------------------------------------------------------------------------------------------------------

*Question 3*:   


From: marc@hotmail.com  
Subject: Error on website  
  
Hi, my website is not working and here's the error:  
  
![error message](./error.png)  
  
Can you fix it please?  

------------------------------------------------------------------------------------------------------------------------------------------

*Answer 3*:


Hey Marc!

Thanks for reaching out and sharing that screenshot. The "Uncaught ReferenceError: searchkit is not defined" error typically means that you're trying to use the searchkit library, but it hasn’t been imported or loaded before it’s referenced.

I have a few things you can try quickly to see if we can get this resolved

First, double-chec that Searchkit is installed. To be sure you can use open up the terminal and install it with npm or yarn to ensure it is available. 

Then, you will need to check your code where the search is intialized. You will want to make sure that you imported it correctly. That should look like...

```
import Searchkit from "searchkit";

const searchkitClient = new Searchkit({
  connection: {
    host: "https://your-algolia-endpoint"
  },
  // ... your config
});
```


Lastly, Since you’re using Parcel, you can try cleaning and rebuilding. You can do this with the following 2 commands in the terminal...
```
rm -rf .parcel-cache dist
npm run build
```

If you want, you can share the code where you are intializing the search and the searchkit is being used. I’d be happy to confirm the correct import and make sure it aligns with your version of Searchkit.

Once we ensure Searchkit is correctly installed and imported, that error should not come up anymore!

Best regards,
Garrett
Customer Success Engineer @ Algolia


------------------------------------------------------------------------------------------------------------------------------------------

